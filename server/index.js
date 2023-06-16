const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.static('public'));
// Middleware pour gérer les requêtes CORS
app.use(cors());
app.use(express.json());


// Configuration de la base de données
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "evaluation-angular",
});

// Connexion à la base de données
connection.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à la base de données :", err);
        return;
    }
    console.log("Connecté à la base de données MySQL");
});



// Point de terminaison pour l'inscription
app.post("/signup", (req, res) => {
    const { name, firstname, email, password, isAdmin } = req.body;
    // Vérifier si l'utilisateur existe déjà dans la base de données
    connection.query(
        "SELECT * FROM user WHERE email = ?",
        [email],
        (err, results) => {
            if (err) {
                throw err;
            }

            if (results.length > 0) {
                return res.status(409).json({ message: "Cet utilisateur existe déjà" });
            }

            // Hasher le mot de passe avant de l'enregistrer dans la base de données
            bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
                if (hashErr) {
                    throw hashErr;
                }

                // Insérer le nouvel utilisateur dans la base de données
                connection.query(
                    "INSERT INTO user (name,firstname,email, password, isAdmin) VALUES (?, ?, ?, ?, ?)",
                    [name, firstname, email, hashedPassword, isAdmin],
                    (insertErr, insertResult) => {
                        if (insertErr) {
                            throw insertErr;
                        }

                        // Générer un token JWT pour l'utilisateur nouvellement inscrit
                        const token = jwt.sign(
                            { email, isAdmin },
                            "your_secret_key",
                            { expiresIn: "1h" } // Expiration du token
                        );

                        // Retourner le token JWT
                        res.json({ token });
                    }
                );
            });
        }
    );
});
//Connexion
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe dans la base de données
    connection.query(
        "SELECT * FROM user WHERE email = ?",
        [email],
        (err, results) => {
            if (err) {
                throw err;
            }

            if (results.length === 0) {
                return res.status(401).json({ message: "Adresse e-mail incorrecte" });
            }

            const user = results[0];

            // Vérifier le mot de passe
            bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
                if (bcryptErr || !bcryptResult) {
                    return res.status(401).json({ message: "Mot de passe incorrect" });
                }

                // Générer un token JWT
                const token = jwt.sign(
                    { id: user.id, email: user.email, isAdmin: user.isAdmin, nom: user.name, prenom: user.firstname },
                    "your_secret_key",
                    { expiresIn: "1d" } // Expiration du token
                );

                // Retourner le token JWT
                res.status(200).json({ "token": token });
            });
        }
    );
});
//Ajout aliment
app.post("/aliment", (req, res) => {
    const aliment = JSON.parse(req.body.aliment);
    // Vérifier si l'aliment existe déjà dans la base de données
    connection.query(
        "SELECT * FROM aliment WHERE name = ?",
        [aliment.name],
        (err, results) => {
            if (err) {
                throw err;
            }
            if (results.length > 0) {
                return res.status(409).json({ message: "Cet aliment existe déjà" });
            }

            // Insérer le nouvel aliment dans la base de données
            connection.query(
                "INSERT INTO aliment set ?",
                [aliment],
                (insertErr, insertResult) => {
                    if (insertErr) {
                        throw insertErr;
                    }
                    res.json({ message: "Aliment ajouté" });
                }
            );
        }
    );
});
//Récupère tous les aliments
app.get("/aliments", (req, res) => {
    connection.query(
        "SELECT * FROM aliment",
        (err, results) => {
            if (err) {
                throw err;
            }
            res.json(results);
        }
    );
});

app.delete("/aliment/:id", (req, res) => {
    const id = req.params.id;
    connection.query(
        "DELETE FROM aliment WHERE id = ?",
        [id],
        (err, results) => {
            if (err) {
                throw err;
            }
            res.json({ message: "Aliment supprimé" });
        }
    );
});

//Ajout d'un user_meals
app.post('/meal', (req, res) => {
    const meal = req.body.meal;
    connection.query(
        "INSERT INTO user_meals set ?",
        [meal],
        (err, results) => {
            if (err) {
                throw err;
            }
            res.json({ message: "Repas ajouté" });
        }
    );
})

app.get('/meals/:id/:date', (req, res) => {
    connection.query(
        "SELECT user_meals.*, aliment.* FROM user_meals JOIN aliment ON user_meals.aliment = aliment.id WHERE user = ? AND user_meals.date = ?", [req.params.id, req.params.date],
        (err, results) => {
            if (err) {
                throw err;
            }

            // Organiser les résultats dans un tableau d'objets avec un objet "aliment"
            const meals = results.map(row => {
                const meal = {
                    id: row.id,
                    user: row.user,
                    type_of_meal: row.type_of_meal,
                    date: row.date,
                    // Autres champs spécifiques à user_meals
                    aliment: {
                        id: row.aliment,
                        name: row.name,
                        calories: row.calories,
                        proteines: row.proteines,
                        lipides: row.lipides,
                        glucides: row.glucides,
                        // Autres champs spécifiques à aliment
                        // Exemple : nom: row.nom, calories: row.calories, etc.
                    }
                };
                return meal;
            });
            res.json(meals);
        }
    );
});

// Route de base
app.get('/', (req, res) => {
    res.send('Bienvenue sur votre serveur Express !');
});

// Démarrez le serveur
const port = 3000;
app.listen(port, () => {
    console.log(`Le serveur Express écoute sur le port ${port}`);
});
