import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Directory } from '../../../helper/directory/directory';

@Component({
  selector: 'app-add-directory',
  templateUrl: './add-directory.component.html',
  styleUrls: [ './add-directory.component.scss' ],
})
export class AddDirectoryComponent implements OnInit {
  @Output() click: EventEmitter<Directory>;

  constructor() {
    this.click = new EventEmitter<Directory>();
  }

  ngOnInit(): void { }

  add() {
    const name = prompt('Add Directory');
    if (name && name.trim().length > 0) {
      const dir = new Directory(name, [], []);
      this.click.emit(dir);
    }
  }
}
