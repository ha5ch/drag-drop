import { Component, OnInit } from '@angular/core';
import { FileComponent } from '../file.component';

@Component({
  selector: 'app-text-file',
  templateUrl: './text-file.component.html',
  styleUrls: [ './text-file.component.scss' ],
})
export class TextFileComponent extends FileComponent implements OnInit {
  constructor() { super(); }

  ngOnInit(): void { }
}
