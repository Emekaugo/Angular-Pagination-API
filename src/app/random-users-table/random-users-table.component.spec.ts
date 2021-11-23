import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomUsersTableComponent } from './random-users-table.component';

describe('RandomUsersTableComponent', () => {
  let component: RandomUsersTableComponent;
  let fixture: ComponentFixture<RandomUsersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomUsersTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomUsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
