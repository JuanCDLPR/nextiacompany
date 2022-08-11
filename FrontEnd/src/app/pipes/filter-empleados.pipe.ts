import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEmpleados',
})
export class FilterEmpleadosPipe implements PipeTransform {
  transform(value: any, ...arg: any[]): any {
    // console.log(value);
    // console.log(arg);
    const resultArray = [];
    for (const item of value) {
      let nombre =
        item.nombre.toLowerCase() + ' ' + item.apellidos.toLowerCase();
      if (nombre.indexOf(arg[0].toLowerCase()) > -1) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
