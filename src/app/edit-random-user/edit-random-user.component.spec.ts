import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRandomUserComponent } from './edit-random-user.component';

describe('EditRandomUserComponent', () => {
  let component: EditRandomUserComponent;
  let fixture: ComponentFixture<EditRandomUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRandomUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRandomUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
