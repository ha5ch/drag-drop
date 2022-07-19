import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDraggerComponent } from './file-dragger.component';

describe('FileDraggerComponent', () => {
  let component: FileDraggerComponent;
  let fixture: ComponentFixture<FileDraggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileDraggerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileDraggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
