import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthentificationService } from './authentification.service';

export const authGuard = () => {
  const router = inject(Router);
  const auth = inject(AuthentificationService);

  //transforme l'observable $jwt en UrlTree ou en booléen true
  // si il renvoit true il laisse passé l'utilisateur
  // si il renvoit un UrlTree, il effectue une redirection
  return auth.$jwt.pipe(
    tap((jwt) => (jwt == null ? router.navigate(['/connexion']) : true))
  );

  //note :
  //- tap permet d'effectuer une transformation sur la
  //  valeur retournée par l'observable
  //- pipe permet de résoudre directement un observable
};
