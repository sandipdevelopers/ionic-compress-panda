import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
})
export class FormatFileSizePipe implements PipeTransform {

  transform(bytes: any): string {
    console.log(bytes);
    
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    let size = bytes;
    let unitIndex = 0;

    // Calculate file size in appropriate unit
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    console.log("size",size);
    
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }

}
