import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTeamEmpComponent } from './dialog-team-emp.component';

describe('DialogTeamEmpComponent', () => {
  let component: DialogTeamEmpComponent;
  let fixture: ComponentFixture<DialogTeamEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTeamEmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTeamEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
