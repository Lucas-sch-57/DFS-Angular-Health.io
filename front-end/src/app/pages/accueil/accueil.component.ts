import { Component } from '@angular/core';
import Aliment from 'src/app/models/Aliment';
import { AlimentsService } from 'src/app/services/aliments.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Meal from 'src/app/models/Meal';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent {
  constructor(
    private auth: AuthentificationService,
    private alimentsService: AlimentsService,
    private fb: FormBuilder
  ) {
    this.alimentsService.getAliments().subscribe({
      next: (data: any) => {
        this.aliments = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.loadUserMeal();
  }

  //User
  user = this.auth.$jwt.value;

  //Aliments et repas
  aliments: Aliment[] = [];
  userMeals: Meal[] = [];

  //Message flash
  isSuccess: boolean = false;
  successMessage: string = '';
  isError: boolean = false;
  errorMessage: string = '';

  //Formulaire
  form: FormGroup = this.fb.group({
    aliment: '',
  });
  typeOfMeals: Array<string> = [
    'Petit déjeuner',
    'Déjeuner',
    'Dîner',
    'Collation',
  ];

  //Dates
  dayDate: string = dayjs().format('DD/MM/YYYY');
  formattedDate: string = dayjs(this.dayDate).format('YYYY-MM-DD');

  //Méthodes
  loadUserMeal() {
    if (this.user) {
      this.alimentsService
        .getUserMeals(this.user.id, this.formattedDate)
        .subscribe({
          next: (data: any) => {
            this.userMeals = data;
          },
        });
    }
  }
  onAddMeal(typeOfMeal: string) {
    const aliment = this.form.value;
    if (!this.user) {
      console.log('User is null');
      return;
    }
    const meal: Meal = {
      user: this.user.id,
      aliment: aliment.aliment,
      type_of_meal: typeOfMeal,
      date: this.formattedDate,
    };
    this.alimentsService.addMeal(meal).subscribe({
      next: (data: any) => {
        //Reset du formulaire et rechargement des repas
        this.form.reset();
        this.loadUserMeal();

        //Message flash
        this.isSuccess = true;
        this.successMessage = 'Repas ajouté avec succès';

        setTimeout(() => {
          this.isSuccess = false;
        }, 3000);
      },
      error: (err) => {
        //Message flash
        this.isError = true;
        this.errorMessage = err.error.message;

        setTimeout(() => {
          this.isError = false;
        }, 3000);
      },
    });
  }
}
