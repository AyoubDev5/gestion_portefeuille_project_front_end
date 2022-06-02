import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMaterialComponent } from './dialog-material.component';

describe('DialogMaterialComponent', () => {
  let component: DialogMaterialComponent;
  let fixture: ComponentFixture<DialogMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
