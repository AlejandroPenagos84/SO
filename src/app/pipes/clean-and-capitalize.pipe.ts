import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanAndCapitalize'
})
export class CleanAndCapitalizePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    // Eliminar '/' y '-'
    let cleanedValue = value.replace(/[\/\-]/g, ' ');

    // Convertir la primera letra a mayúsculas y el resto a minúsculas
    cleanedValue = cleanedValue.toLowerCase();
    cleanedValue = cleanedValue.charAt(0).toUpperCase() + cleanedValue.slice(1);

    return cleanedValue;
  }

}