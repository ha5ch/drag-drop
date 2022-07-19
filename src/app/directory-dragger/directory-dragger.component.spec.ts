import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryDraggerComponent } from './directory-dragger.component';

describe('DirectoryComponent', () => {
  let component: DirectoryDraggerComponent;
  let fixture: ComponentFixture<DirectoryDraggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectoryDraggerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectoryDraggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
