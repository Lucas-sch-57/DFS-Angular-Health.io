import Aliment from './Aliment';

export default interface Meal {
  aliment: Aliment;
  user: number | null;
  type_of_meal: string;
  date: string;
}
