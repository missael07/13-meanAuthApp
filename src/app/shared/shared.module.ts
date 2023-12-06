import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorCustomLabelDirective } from './directives/error-custom-label.directive';



@NgModule({
  declarations: [ErrorCustomLabelDirective],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorCustomLabelDirective
  ]
})
export class SharedModule { }
