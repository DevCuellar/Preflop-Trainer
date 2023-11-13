import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strategy'
})
export class StrategyPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if(value.indexOf('-') > 0){
      const min = Number(value.split('-')[0]);
      const max = Number(value.split('-')[1]);
      if (max-min == 1){
        return min.toString();
      }
      return value;
    }
    return value;
  }

}
