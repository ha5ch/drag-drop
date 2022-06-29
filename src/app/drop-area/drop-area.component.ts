import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { preventStop } from '../../helper/event-handler/prevent-stop';

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
    this.dragoverListener()
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
