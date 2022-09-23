import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
 */
@Pipe({ name: 'capitalFl' })
export class CapitalizeFirstLetterPipe implements PipeTransform {
  transform(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
