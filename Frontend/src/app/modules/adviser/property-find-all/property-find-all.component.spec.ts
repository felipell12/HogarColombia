import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyFindAllComponent } from './property-find-all.component';

describe('PropertyFindAllComponent', () => {
  let component: PropertyFindAllComponent;
  let fixture: ComponentFixture<PropertyFindAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyFindAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyFindAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
