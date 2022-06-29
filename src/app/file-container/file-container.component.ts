import { Component, OnInit } from '@angular/core';
import { DropService } from '../drop-area/drop.service';
import { IFile } from '../../helper/file/file';

@Component({
  selector: 'app-file-container',
  templateUrl: './file-container.component.html',
  styleUrls: [ './file-container.component.scss' ],
})
export class FileContainerComponent implements OnInit {
  public file?: IFile;

  constructor(private dropService: DropService) { }

  ngOnInit(): void {
    this.dropService.current$.subscribe(file => this.file = file);
  }
}
