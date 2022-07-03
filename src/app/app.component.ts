import { Component, OnInit } from '@angular/core';
import { db } from '../helper/db/db';
import { IBinaryFile } from '../helper/file/file';
import { DropService } from './drop-area/drop.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'drag-drop';

  public storedFiles: IBinaryFile[] = [];

  constructor(private dropService: DropService) { }

  ngOnInit(): void {
    this.dropService.current$.subscribe(file => (this.storedFiles = [file, ...this.storedFiles]));
    db.getFiles()
      .then(async files => {
        return Promise.all(files.map(async file => {
          await file.loadContent();
          return file;
        }));
      })
      .then(files => this.storedFiles = files)
      .then(_ => console.log(this.storedFiles));
  }

  public delete(file: IBinaryFile): void {
    db.deleteFile(file)
      .then(isDeleted => { if (isDeleted) { this.storedFiles = this.storedFiles.filter(f => f.name !== file.name); } })
      .catch(console.error);
  }
}
