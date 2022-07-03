import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directory-dragger',
  templateUrl: './directory-dragger.component.html',
  styleUrls: ['./directory-dragger.component.scss']
})
export class DirectoryDraggerComponent implements OnInit {
  public directories: string[] = [];

  constructor() { }

  ngOnInit(): void { }

  add() {
    const name = prompt("test");
    if (name && name.trim().length > 0 && !this.directories.find(d => d === name)) {
      this.directories.push(name);
    }
  }
}
