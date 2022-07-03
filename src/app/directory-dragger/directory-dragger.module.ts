import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectoryDraggerComponent } from './directory-dragger.component';


@NgModule({
  declarations: [
    DirectoryDraggerComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DirectoryDraggerComponent,
  ]
})
export class DirectoryDraggerModule { }
