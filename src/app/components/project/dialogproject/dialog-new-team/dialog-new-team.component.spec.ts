import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewTeamComponent } from './dialog-new-team.component';

describe('DialogNewTeamComponent', () => {
  let component: DialogNewTeamComponent;
  let fixture: ComponentFixture<DialogNewTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNewTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
