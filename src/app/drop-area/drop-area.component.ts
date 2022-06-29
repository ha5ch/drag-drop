import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { preventStop } from '../../helper/event-handler/prevent-stop';
import { blob2string } from '../../helper/file-handler/blob2string';
import { UploadFile } from '../../helper/file/file';

@Component({
  selector: 'app-drop-area',
  templateUrl: './drop-area.component.html',
  styleUrls: [ './drop-area.component.scss' ],
})
export class DropAreaComponent implements OnInit, OnDestroy {
  private dragoverUnListener!: Function;
  private isDragging: boolean = false;

  constructor(
    private renderer: Renderer2,
    private ref: ElementRef,
  ) { }

  ngOnInit(): void {
    this.dragoverListener();
  }

  private dragoverListener() {
    this.isDragging = false;
    this.dragoverUnListener = this.renderer.listen(this.ref.nativeElement, 'dragover', (event: DragEvent) => {
      preventStop(event);
      this.isDragging = true;
      this.dragoverUnListener();
    });
  }

  @HostListener('dragleave', [ '$event' ])
  private dragleave(event: DragEvent) {
    preventStop(event);
    this.dragoverListener();
  }

  @HostListener('drop', [ '$event' ])
  private drop(event: DragEvent) {
    preventStop(event);
    console.log('drop', event.dataTransfer?.files);
    if ((event.dataTransfer?.files || []).length > 0) {
      const files = event.dataTransfer!.files;
      for (let i = 0; i < files.length; i++) {
        const file = new UploadFile(files.item(i)!);
        file.content
          .then(console.log)
          .catch(console.error);
      }
    }
    this.dragoverListener();
  }

  ngOnDestroy(): void {
    this.dragoverUnListener();
  }

  public get background() {
    return this.isDragging ? '#bbb' : '#fff';
  }

  public get text() {
    return this.isDragging ? 'drop' : 'drag';
  }
}
