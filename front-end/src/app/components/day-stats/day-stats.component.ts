import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto'; // import Chart from chart.js/auto instead of chart.js
import { AlimentsService } from 'src/app/services/aliments.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { StatsService } from 'src/app/services/stats.service';
@Component({
  selector: 'app-day-stats',
  templateUrl: './day-stats.component.html',
  styleUrls: ['./day-stats.component.scss'],
})
export class DayStatsComponent implements OnChanges {
  constructor(
    private statsService: StatsService,
    private http: HttpClient,
    private auth: AuthentificationService,
    private alimentsService: AlimentsService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.totalCalories = this.statsService.totalNutrient(
      this.userMeals,
      'calories'
    );
    this.totalLipides = this.statsService.totalNutrient(
      this.userMeals,
      'lipides'
    );
    this.totalGlucides = this.statsService.totalNutrient(
      this.userMeals,
      'glucides'
    );
    this.totalProteines = this.statsService.totalNutrient(
      this.userMeals,
      'proteines'
    );
    this.createChart();
  }
  @Input()
  dayDate: string = '';

  @Input()
  formattedDate: string = '';

  @Input()
  userMeals: any[] = [];

  totalCalories: number = 0;
  totalLipides: number = 0;
  totalGlucides: number = 0;
  totalProteines: number = 0;

  user = this.auth.$jwt.value;
  chart: any;
  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart('canvas', {
      type: 'pie', //this denotes tha type of chart
      data: {
        // values on X-Axis
        labels: ['Calories', 'Lipides', 'Glucides', 'Protéines'],
        datasets: [
          {
            label: 'Consommation',
            data: [
              this.totalCalories,
              this.totalLipides,
              this.totalGlucides,
              this.totalProteines,
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)', //red
              'rgba(54, 162, 235, 0.5)', //blue
              'rgba(255, 206, 86, 0.5)', //yellow
              'rgba(75, 192, 192, 0.5)', //green
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)', //red
              'rgba(54, 162, 235, 1)', //blue
              'rgba(255, 206, 86, 1)', //yellow
              'rgba(75, 192, 192, 1)', //green
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
