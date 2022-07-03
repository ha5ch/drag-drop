import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropService } from '../drop-area/drop.service';
import { IBinaryFile } from '../../../helper/file/file';

@Component({
  selector: 'app-file-container',
  templateUrl: './file-container.component.html',
  styleUrls: [ './file-container.component.scss' ],
})
export class FileContainerComponent implements OnInit {
  @Input() public file!: IBinaryFile;
  @Output() deleted: EventEmitter<IBinaryFile>;

  constructor() {
    this.deleted = new EventEmitter();
  }

  get fileType() {
    if (this.file?.isText) {
      return 'text';
    }
    if (this.file?.type.match(/image/)) {
      return 'image';
    }
    return 'download';
  }

  ngOnInit(): void { }


  delete() {
    this.deleted.emit(this.file);
  }
}
