import { Component, OnInit } from '@angular/core';
import { FileComponent } from '../file.component';

@Component({
  selector: 'app-download-file',
  templateUrl: './download-file.component.html',
  styleUrls: [ './download-file.component.scss' ],
})
export class DownloadFileComponent extends FileComponent implements OnInit {
  constructor() { super(); }

  ngOnInit(): void { }
}
