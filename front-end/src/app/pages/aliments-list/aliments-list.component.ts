import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Aliment from 'src/app/models/Aliment';
import { Jwt } from 'src/app/models/Jwt';
import { AlimentsService } from 'src/app/services/aliments.service';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-aliments-list',
  templateUrl: './aliments-list.component.html',
  styleUrls: ['./aliments-list.component.scss'],
})
export class AlimentsListComponent {
  aliments: Aliment[] = [];
  constructor(
    private http: HttpClient,
    private auth: AuthentificationService,
    private alimentsService: AlimentsService
  ) {
    this.alimentsService.getAliments().subscribe({
      next: (data: any) => {
        this.aliments = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  user = this.auth.$jwt.value;

  onDelete(id: number) {
    this.http.delete(`http://localhost:3000/aliment/${id}`).subscribe({
      next: () => {
        this.aliments = this.aliments.filter((aliment) => aliment.id !== id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
