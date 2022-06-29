import { Component, HostListener, OnInit } from '@angular/core';
import { preventStop } from '../../helper/event-handler/prevent-stop';
import { UploadFile } from '../../helper/file/upload.file';
import { DropService } from './drop.service';

@Component({
  selector: 'app-drop-area',
  templateUrl: './drop-area.component.html',
  styleUrls: [ './drop-area.component.scss' ],
})
export class DropAreaComponent implements OnInit {
  private isDragging: boolean = false;

  constructor(private dropService: DropService) { }

  public get background() {
    return this.isDragging ? '#bbb' : '#fff';
  }

  public get text() {
    return this.isDragging ? 'drop' : 'drag';
  }

  ngOnInit(): void { }

  @HostListener('dragover', [ '$event' ])
  private dragover(event: DragEvent) {
    preventStop(event);
    this.isDragging = true;
  }

  @HostListener('dragleave', [ '$event' ])
  private dragleave(event: DragEvent) {
    preventStop(event);
    this.isDragging = false;
  }

  @HostListener('drop', [ '$event' ])
  private drop(event: DragEvent) {
    preventStop(event);
    if ((event.dataTransfer?.files || []).length > 0) {
      const files = event.dataTransfer!.files;
      for (let i = 0; i < files.length; i++) {
        this.dropService.current = new UploadFile(files.item(i)!);
      }
    }
    this.isDragging = false;
  }
}
