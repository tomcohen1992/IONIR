import { Directive, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[numbersOnly]'
})
export class AppOnlyDigitsDirective {
  @HostListener('input', ['$event'])
  onKeyDown(ev: KeyboardEvent): void {
    const input = ev.target as HTMLInputElement;
    input.value = String(input.value.replace(/[^0-9]*/g, ''));
  }
}
