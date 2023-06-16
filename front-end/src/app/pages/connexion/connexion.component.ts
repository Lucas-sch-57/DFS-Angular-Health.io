import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
})
export class ConnexionComponent {
  formulaire: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthentificationService,
    private router: Router
  ) {}

  onConnexion() {
    if (this.formulaire.valid) {
      this.auth.login(this.formulaire.value).subscribe((success) => {
        if (success) {
          this.router.navigateByUrl('/accueil');
        } else {
          alert('Mauvais login / mot de passe');
        }
      });
    }
  }
}
