import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumerateur',
})
export class EnumerateurPipe implements PipeTransform {
  transform(value: number): number[] {

    const tab = [];
    for (let i = 0; i < value; i++) {
      tab.push(i);
    }

    return tab;
  }
}
