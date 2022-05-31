import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutWebsiteComponent } from './layout-website.component';

describe('LayoutWebsiteComponent', () => {
  let component: LayoutWebsiteComponent;
  let fixture: ComponentFixture<LayoutWebsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutWebsiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
