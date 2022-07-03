import { Component, OnInit } from '@angular/core';
import { Directory, IDirectory } from 'src/helper/directory/directory';

@Component({
  selector: 'app-directory-dragger',
  templateUrl: './directory-dragger.component.html',
  styleUrls: ['./directory-dragger.component.scss']
})
export class DirectoryDraggerComponent implements OnInit {
  public directories: IDirectory[] = [];

  constructor() { }

  ngOnInit(): void { }

  add() {
    const name = prompt("test");
    if (name && name.trim().length > 0 && !this.directories.find(d => d.name === name)) {
      this.directories.push(new Directory(name, [], []));
      this.directories.sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      });
    }
  }
}
