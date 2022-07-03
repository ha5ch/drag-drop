import { Component, Input } from '@angular/core';
import { IBinaryFile } from '../../helper/file/file';

@Component({
  template: '',
  styleUrls: [ './file.component.scss' ],
})
export abstract class FileComponent {
  @Input() file!: IBinaryFile;

  get modifiedDate() {
    return new Date(this.file.lastModified).toLocaleString();
  }
}
