import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { EditAlimentComponent } from './pages/edit-aliment/edit-aliment.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { authGuard } from './services/auth.guard';
import { Page404Component } from './pages/page404/page404.component';
import { AlimentsListComponent } from './pages/aliments-list/aliments-list.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent, canActivate: [authGuard] },
  {
    path: 'edit-aliment',
    component: EditAlimentComponent,
    canActivate: [authGuard],
  },
  {
    path: 'connexion',
    component: ConnexionComponent,
  },
  {
    path: 'aliments',
    component: AlimentsListComponent,
  },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
