import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogprojectComponent } from './dialogproject.component';

describe('DialogprojectComponent', () => {
  let component: DialogprojectComponent;
  let fixture: ComponentFixture<DialogprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogprojectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
