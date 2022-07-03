import { Component, OnInit } from '@angular/core';
import { db } from '../helper/db/db';
import { IBinaryFile } from '../helper/file/file';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'drag-drop';

  public storedFiles: IBinaryFile[] = [];

  ngOnInit(): void {
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
}
