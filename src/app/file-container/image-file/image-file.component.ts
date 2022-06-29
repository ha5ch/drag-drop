import { Component, OnInit } from '@angular/core';
import { FileComponent } from '../file.component';

@Component({
  selector: 'app-image-file',
  templateUrl: './image-file.component.html',
  styleUrls: [ './image-file.component.scss' ],
})
export class ImageFileComponent extends FileComponent implements OnInit {
  constructor() { super(); }

  ngOnInit(): void { }
}
