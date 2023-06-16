export interface Jwt {
  id: number;
  email: string;
  nom: string;
  prenom: string;
  exp: number;
  iat: number;
  isAdmin: boolean;
}
