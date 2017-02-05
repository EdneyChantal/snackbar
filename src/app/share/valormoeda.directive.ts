import { Directive, ElementRef, Input , HostListener } from '@angular/core';


@Directive({ selector: '[myvalormoeda]' })

export class ValorMoedaDirective {
    constructor(el: ElementRef) {
       el.nativeElement.style.backgroundColor = 'yellow';
       console.log('entrei');
    }
    @HostListener('mouseenter') OnMouseEnter() {
       console.log(this);
    }
}