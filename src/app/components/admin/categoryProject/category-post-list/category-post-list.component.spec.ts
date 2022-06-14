import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPostListComponent } from './category-post-list.component';

describe('CategoryPostListComponent', () => {
  let component: CategoryPostListComponent;
  let fixture: ComponentFixture<CategoryPostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryPostListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
