import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {
  @Input() dir!: string;

  constructor() { }

  ngOnInit(): void { }
}
