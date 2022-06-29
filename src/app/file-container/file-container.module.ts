import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileContainerComponent } from './file-container.component';


@NgModule({
  declarations: [
    FileContainerComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FileContainerComponent,
  ],
})
export class FileContainerModule {}
