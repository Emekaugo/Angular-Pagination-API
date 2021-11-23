import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiPaginationComponent } from './api-pagination.component';

describe('ApiPaginationComponent', () => {
  let component: ApiPaginationComponent;
  let fixture: ComponentFixture<ApiPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiPaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
