import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsEmpComponent } from './teams-emp.component';

describe('TeamsEmpComponent', () => {
  let component: TeamsEmpComponent;
  let fixture: ComponentFixture<TeamsEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsEmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
