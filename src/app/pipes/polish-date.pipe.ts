import { Pipe, PipeTransform } from '@angular/core';

const MONTHS = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];

@Pipe({
  name: 'polishDate'
})

export class PolishDatePipe implements PipeTransform {

  date: Date;
  monthNumber: number;
  month: string;

  transform(value: any, args?: any): any {
    console.log(value);

    this.date = new Date(value);
    console.log(this.date);

    this.monthNumber = this.date.getMonth();
    console.log(this.monthNumber);

    this.month = MONTHS[this.monthNumber];
    console.log(this.month);

    return this.date.getDate() + ' ' + this.month + ' ' + this.date.getFullYear();
  }

}

