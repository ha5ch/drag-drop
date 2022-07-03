import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileDraggerComponent } from './file-dragger.component';
import { FileContainerModule } from './file-container/file-container.module';
import { DropAreaComponent } from './drop-area/drop-area.component';


@NgModule({
  declarations: [
    FileDraggerComponent,
    DropAreaComponent,
  ],
  imports: [
    CommonModule,
    FileContainerModule,
  ],
  exports: [
    FileDraggerComponent,
  ]
})
export class FileDraggerModule { }
