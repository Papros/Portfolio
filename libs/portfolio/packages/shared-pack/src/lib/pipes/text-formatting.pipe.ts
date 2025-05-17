import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase',
})
export class CamelCaseFormatPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .toLowerCase()
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

@Pipe({
  name: 'upperCase',
})
export class UpperCaseFormatPipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}

@Pipe({
  name: 'lowerCase',
})
export class LowerCaseFormatPipe implements PipeTransform {
  transform(value: string): string {
    return value.toLowerCase();
  }
}
