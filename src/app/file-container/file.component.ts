import { Component, Input } from '@angular/core';
import { IFile } from '../../helper/file/file';

@Component({
  template: '',
  styleUrls: [ './file.component.scss' ],
})
export abstract class FileComponent {
  @Input() file!: IFile;

  get modifiedDate() {
    return new Date(this.file.lastModified).toLocaleString();
  }
}
