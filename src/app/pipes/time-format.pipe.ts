import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (!value) return "0";
    try {

      const hours = Math.floor(value / 3600);
      const minutes = Math.floor((value % 3600) / 60);
      const seconds = Math.floor(value % 60);

      if (hours > 0) {
        return this.pad(hours) + ":" + this.pad(minutes) + ":" + this.pad(seconds);
      } else if (minutes > 0) {
        return this.pad(minutes) + ":" + this.pad(seconds);
      } else {
        return this.pad(seconds) + ' Sec';
      }
    } catch (error) {
      console.error("Error formatting value:", error);
      return "0";
    }
  }

 pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
