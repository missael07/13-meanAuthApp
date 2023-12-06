import { Directive, ElementRef, Input } from '@angular/core';
import { ValidationErrors, Validators } from '@angular/forms';

@Directive({
  selector: '[errorCustomLabel]'
})
export class ErrorCustomLabelDirective {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null | undefined

  @Input() set errors ( value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage();
  }
  @Input() set color (value: string ){
    this._color = value;
    this.setStyle();
  }
  constructor(private element: ElementRef<HTMLElement>) {
    this.htmlElement = element;
    
  }

  ngOnInit(): void {
    this.setStyle();
  }

  setStyle():void {
    if( !this.htmlElement) return;

    this.htmlElement.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {
    if( !this.htmlElement) return;
    if( !this._errors) {
      this.htmlElement.nativeElement.innerHTML = '';
      return;
    };

    this.htmlElement.nativeElement.style.color = 'red';
    const errors = Object.keys(this._errors);

    if(errors.includes(Validators.required.name)){
      this.htmlElement.nativeElement.innerHTML = 'Field required.';
      return;
    }
    if(errors.includes('minlength')){
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];
      this.htmlElement.nativeElement.innerHTML = `Must be ${min} characters / entered ${current}.`;
      return;
    }

    if(errors.includes(Validators.email.name)){
      this.htmlElement.nativeElement.innerHTML = 'Must be a valid email.';
      return;
    }

  
  }
}
