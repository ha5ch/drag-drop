import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Directory } from '../../../helper/directory/directory';

@Component({
  selector: 'app-add-directory',
  template: '<span>{{text}}</span>',
})
export class AddDirectoryComponent {
  @Input() text: string = `+`;
  @Output() added: EventEmitter<Directory>;

  constructor(private self: ElementRef) {
    this.added = new EventEmitter<Directory>();
    this.add = this.add.bind(this);
    self.nativeElement.addEventListener('click', this.add);
  }

  add() {
    const name = prompt('Add Directory');
    if (name && name.trim().length > 0) {
      const dir = new Directory(name, [], []);
      this.added.emit(dir);
    }
  }
}
