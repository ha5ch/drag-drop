import { Component, OnInit } from '@angular/core';
import { Directory } from 'src/helper/directory/directory';
import { db } from '../../helper/db/db';

@Component({
  selector: 'app-directory-dragger',
  templateUrl: './directory-dragger.component.html',
  styleUrls: [ './directory-dragger.component.scss' ],
})
export class DirectoryDraggerComponent implements OnInit {
  public directories: Directory[] = [];

  constructor() { }

  ngOnInit(): void {
    db.getDirectories().then(dirs => {
      dirs.forEach(dir => {
        this.addDirectory(dir);
      });
    })
      .then(_ => console.log(this.directories))
      .catch(console.error);
  }

  add() {
    const name = prompt('Add Directory');
    if (name && name.trim().length > 0) {
      const dir = new Directory(name, [], []);
      this.addDirectory(dir);
    }
  }

  delete(dir: Directory) {
    db.deleteDirectory(dir)
      .then((isDeleted: boolean) => {
        if (isDeleted) {
          this.directories = this.directories.filter(d => d.name !== dir.name);
        }
      });
  }

  private addDirectory(directory: Directory): void {
    if (this.directories.find(d => d.name === directory.name) === undefined) {
      this.directories.push(directory);
      this.directories.sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      });
      directory.save();
    }
  }
}
