import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumberFormat',
})
export class PhoneNumberFormatPipe implements PipeTransform {
  transform(value: string | number): string {
    if (!value) return '';

    const str = value.toString().replace(/\D/g, ''); // only digits
    if (str.length <= 9) {
      // No country code, just format the number
      const main =
        str
          .padStart(9, ' ')
          .match(/.{1,3}/g)
          ?.join(' ') ?? '';
      return main.trim();
    }

    const nationalNumber = str.slice(-9);
    const countryCode = str.slice(0, -9);

    const formattedNumber = nationalNumber.match(/.{1,3}/g)?.join(' ') ?? '';

    return `+${countryCode} ${formattedNumber}`;
  }
}
