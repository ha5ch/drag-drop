import { Component, Input, OnInit } from '@angular/core';
import { DropService } from '../drop-area/drop.service';
import { IBinaryFile } from '../../helper/file/file';

@Component({
  selector: 'app-file-container',
  templateUrl: './file-container.component.html',
  styleUrls: [ './file-container.component.scss' ],
})
export class FileContainerComponent implements OnInit {
  @Input() public file?: IBinaryFile;

  constructor(private dropService: DropService) { }

  get fileType() {
    if (this.file?.isText) {
      return 'text';
    }
    if (this.file?.type.match(/image/)) {
      return 'image';
    }
    return 'download';
  }

  ngOnInit(): void {
    if (!this.file) {
      this.dropService.current$.subscribe(file => this.file = file);
    }
  }
}
