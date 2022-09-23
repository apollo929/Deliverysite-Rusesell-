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
@Pipe({ name: 'time' })
export class TimePipe implements PipeTransform {
  transform(value: number): string {
    const totalMinutes = Number(value);
    if (totalMinutes === 0 || !totalMinutes) {
      return '00:00';
    }
    let hours = `${totalMinutes / 60}`;
    let minutes = `${totalMinutes % 60}`;
    minutes = minutes.length == 1 ? 0 + minutes : minutes;
    hours = hours.length == 1 ? 0 + hours : hours;
    return `${hours}:${minutes}`;
  }
}
