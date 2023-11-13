import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[dcmFallback]'
})
export class FallbackDirective {
  @Input() imagen: string;

  constructor(private eRef: ElementRef) {}

  @HostListener('error')
  loadFallbackonError() {
    const element: HTMLImageElement = this.eRef.nativeElement as HTMLImageElement;
    element.src = this.imagen || 'assets/img/rangenotfound.png';
  }
}
