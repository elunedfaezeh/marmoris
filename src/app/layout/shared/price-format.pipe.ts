import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true, 
  name: 'priceFormat'
})
export class PriceFormatPipe implements PipeTransform {
  transform(value: number | string): string {
    const numericValue = typeof value === 'string' ? parseInt(value.replace(/,/g, ''), 10) : value;
    return numericValue.toLocaleString('fa-IR');
  }
}
