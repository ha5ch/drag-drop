import { Component, OnInit } from '@angular/core';
import { FileComponent } from '../file.component';

@Component({
  selector: 'app-download-file',
  templateUrl: './download-file.component.html',
  styleUrls: [
    '../file.component.scss',
    './download-file.component.scss',
  ],
})
export class DownloadFileComponent extends FileComponent implements OnInit {
  constructor() { super(); }

  ngOnInit(): void { }

  download() {
    const a = document.createElement('a');
    a.href = this.file.content;
    a.download = this.file.name;
    a.click();
    a.remove();
  }
}
