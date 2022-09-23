import { DatePipe } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bcDate',
})
export class BCDatePipe extends DatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) locale: string) {
    super(locale);
  }

  transform(
    value: Date | string | number | undefined | null,
    format?: string,
  ): any {
    return super.transform(value, format, '+0000', 'en-US') || '';
  }
}
