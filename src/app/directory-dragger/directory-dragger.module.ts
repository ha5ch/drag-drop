import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectoryDraggerComponent } from './directory-dragger.component';
import { DirectoryComponent } from './directory/directory.component';
import { FileContainerModule } from '../file-dragger/file-container/file-container.module';


@NgModule({
  declarations: [
    DirectoryDraggerComponent,
    DirectoryComponent,
  ],
  imports: [
    CommonModule,
    FileContainerModule,
  ],
  exports: [
    DirectoryDraggerComponent,
  ]
})
export class DirectoryDraggerModule { }
