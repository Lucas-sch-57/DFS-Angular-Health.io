import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { EditAlimentComponent } from './pages/edit-aliment/edit-aliment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { Page404Component } from './pages/page404/page404.component';
import { AlimentsListComponent } from './pages/aliments-list/aliments-list.component';
import { EnumerateurPipe } from './pipes/enumerateur.pipe';
import { DayStatsComponent } from './components/day-stats/day-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    EditAlimentComponent,
    ConnexionComponent,
    Page404Component,
    AlimentsListComponent,
    EnumerateurPipe,
    DayStatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
