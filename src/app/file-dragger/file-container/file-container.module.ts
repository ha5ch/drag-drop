import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileContainerComponent } from './file-container.component';
import { TextFileComponent } from './text-file/text-file.component';
import { ImageFileComponent } from './image-file/image-file.component';
import { DownloadFileComponent } from './download-file/download-file.component';


@NgModule({
  declarations: [
    FileContainerComponent,
    TextFileComponent,
    ImageFileComponent,
    DownloadFileComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FileContainerComponent,
  ],
})
export class FileContainerModule { }
