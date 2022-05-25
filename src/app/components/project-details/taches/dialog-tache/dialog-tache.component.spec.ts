import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTacheComponent } from './dialog-tache.component';

describe('DialogTacheComponent', () => {
  let component: DialogTacheComponent;
  let fixture: ComponentFixture<DialogTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTacheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
