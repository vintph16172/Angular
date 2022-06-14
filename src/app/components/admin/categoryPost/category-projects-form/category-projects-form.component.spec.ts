import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProjectsFormComponent } from './category-projects-form.component';

describe('CategoryProjectsFormComponent', () => {
  let component: CategoryProjectsFormComponent;
  let fixture: ComponentFixture<CategoryProjectsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryProjectsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryProjectsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
