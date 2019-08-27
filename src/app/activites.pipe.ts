import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activites'
})
export class ActivitesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
