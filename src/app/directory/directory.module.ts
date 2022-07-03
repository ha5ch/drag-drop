import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectoryComponent } from './directory.component';


@NgModule({
  declarations: [
    DirectoryComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DirectoryComponent,
  ]
})
export class DirectoryModule { }
