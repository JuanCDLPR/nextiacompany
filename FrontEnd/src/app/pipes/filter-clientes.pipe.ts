import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterClientes',
})
export class FilterClientesPipe implements PipeTransform {
  transform(value: any, ...arg: any[]): any {
    // console.log(value);
    // console.log(arg);
    const resultArray = [];
    for (const item of value) {
      if (item.empresa.toLowerCase().indexOf(arg[0].toLowerCase()) > -1) {
        resultArray.push(item);
      }
    }
    // console.log(resultArray);
    return resultArray;
  }
}
