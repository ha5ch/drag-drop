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

  download() {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(this.file.binary);
    a.download = this.file.name;
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
  }
}
