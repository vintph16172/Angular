import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPostFormComponent } from './category-post-form.component';

describe('CategoryPostFormComponent', () => {
  let component: CategoryPostFormComponent;
  let fixture: ComponentFixture<CategoryPostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryPostFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
