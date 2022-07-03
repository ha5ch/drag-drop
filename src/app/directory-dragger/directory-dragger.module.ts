import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectoryDraggerComponent } from './directory-dragger.component';
import { DirectoryComponent } from './directory/directory.component';
import { FileContainerModule } from '../file-dragger/file-container/file-container.module';
import { AddDirectoryComponent } from './add-directory/add-directory.component';


@NgModule({
  declarations: [
    DirectoryDraggerComponent,
    DirectoryComponent,
    AddDirectoryComponent,
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
