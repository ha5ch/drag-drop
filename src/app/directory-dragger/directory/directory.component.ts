import { Component, HostListener, Input, OnInit } from '@angular/core';
import { IDirectory } from 'src/helper/directory/directory';
import { preventStop } from '../../../helper/event-handler/prevent-stop';
import { UploadFile } from '../../../helper/file/upload.file';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {
  public isDragging: boolean = false;

  @Input() dir!: IDirectory;

  constructor() { }

  ngOnInit(): void { }

  @HostListener('dragover', [ '$event' ])
  private dragover(event: DragEvent) {
    preventStop(event);
    this.isDragging = true;
  }

  @HostListener('dragleave', [ '$event' ])
  private dragleave(event: DragEvent) {
    preventStop(event);
    this.isDragging = false;
  }

  @HostListener('drop', [ '$event' ])
  private drop(event: DragEvent) {
    preventStop(event);
    if ((event.dataTransfer?.files || []).length > 0) {
      const files = event.dataTransfer!.files;
      for (let i = 0; i < files.length; i++) {
        const file = new UploadFile(files.item(i)!);
        file.loadContent().then(_ => this.dir.files.push(file));
      }
    }
    this.isDragging = false;
  }
}
