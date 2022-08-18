import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Directory } from 'src/helper/directory/directory';
import { preventStop } from '../../../helper/event-handler/prevent-stop';
import { UploadFile } from '../../../helper/file/upload.file';
import { IBinaryFile } from '../../../helper/file/file';
import * as JSZip from 'jszip';

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

  get subDirectories(): Directory[] {
    return this.dir.subDirectories as Directory[];
  }

  ngOnInit(): void { }

  deleteFile(file: IBinaryFile) {
    this.dir.deleteFile(file);
  }

  deleteSelf(dir: Directory) {
    this.dirDeleted.emit(dir);
  }

  addDirectory(dir: Directory) {
    console.log('add new', dir);
    if (this.dir.subDirectories.find(d => d.name === dir.name) === undefined) {
      this.dir.addDirectory(dir);
    }
  }

  deleteDir(dir: Directory) {
    this.dir.deleteSubDirectory(dir);
  }

  download(dir: Directory) {
    const zip = new JSZip();

    function addFile(file: IBinaryFile) {
      if (file.isText) {
        zip.file(file.name, file.content);
      }
      if (file.isBinary) {
        zip.file(file.name, file.binary, { binary: file.isBinary });
      }
      if (file.isImage) {
        zip.file(file.name, file.content.split(',')[1], { base64: true });
      }
    }

    dir.files.forEach(addFile);
    dir.subDirectories.forEach(function addSub(sub) {
      // TODO: Refactor! Only works for 1 layer of directories!!
      zip.folder(sub.name);
      sub.subDirectories.forEach(addSub);
      sub.files.map(f => {
        return {
          name: `${sub.name}/${f.name}`,
          binary: f.binary,
          content: f.content,
          isBinary: f.isBinary,
          isImage: f.isImage,
          isText: f.isText,
        } as IBinaryFile;
      }).forEach(addFile);
    });
    zip.generateAsync({ type: 'blob' })
      .then(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = dir.name + '.zip';
        a.click();
        URL.revokeObjectURL(a.href);
        a.remove();
      });
  }

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
          const override = confirm('File already exists, do you want to override it?');
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
}
