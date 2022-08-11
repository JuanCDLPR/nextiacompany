import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterReportes',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, ...arg: any[]): any {
    // console.log(value);
    // console.log(arg);
    const resultArray = [];
    for (const item of value) {
      if (item.folio.toLowerCase().indexOf(arg[0].toLowerCase()) > -1) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
