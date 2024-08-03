import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberOnly'
})
export class NumberOnlyPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.replace(/\D/g, '');
  }
}
