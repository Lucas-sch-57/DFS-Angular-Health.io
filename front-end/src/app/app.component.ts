import { Component } from '@angular/core';
import { AuthentificationService } from './services/authentification.service';
import { Jwt } from './models/Jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  jwt: Jwt | null = null;
  constructor(private auth: AuthentificationService, private router: Router) {
    this.auth.$jwt.subscribe((jwt) => (this.jwt = jwt));
  }

  onDeconnexion() {
    this.auth.logout();
    this.router.navigateByUrl('/connexion');
  }
}
