import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'admin'
})
export class AdminPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
