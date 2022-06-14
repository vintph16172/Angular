import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProjectsListComponent } from './category-projects-list.component';

describe('CategoryProjectsListComponent', () => {
  let component: CategoryProjectsListComponent;
  let fixture: ComponentFixture<CategoryProjectsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryProjectsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryProjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
