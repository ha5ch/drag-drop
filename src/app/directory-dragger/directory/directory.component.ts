import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Directory } from 'src/helper/directory/directory';
import { preventStop } from '../../../helper/event-handler/prevent-stop';
import { UploadFile } from '../../../helper/file/upload.file';
import { IBinaryFile } from '../../../helper/file/file';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: [ './directory.component.scss' ],
})
export class DirectoryComponent implements OnInit {
  public isDragging: boolean = false;

  @Input() dir!: Directory;
  @Output() dirDeleted: EventEmitter<Directory>;

  constructor() {
    this.dirDeleted = new EventEmitter<Directory>();
  }

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
        if (this.dir.files.find(f => f.name === file.name) !== undefined) {
          const override = confirm("File already exists, do you want to override it?");
          if (!override) { return; }
          this.dir.deleteFile(file);
        }
        file.loadContent().then(_ => this.dir.addFile(file))
          .then(_ => console.log(this.dir))
          .catch(console.error);
      }
    }
    this.isDragging = false;
  }

  deleteFile(file: IBinaryFile) {
    this.dir.deleteFile(file);
  }

  deleteSelf(dir: Directory) {
    this.dirDeleted.emit(dir);
  }

  addDirectory(dir: Directory) {
    console.log("add new", dir);
  }
}
