import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectoryDraggerComponent } from './directory-dragger.component';
import { DirectoryComponent } from './directory/directory.component';


@NgModule({
  declarations: [
    DirectoryDraggerComponent,
    DirectoryComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DirectoryDraggerComponent,
  ]
})
export class DirectoryDraggerModule { }
