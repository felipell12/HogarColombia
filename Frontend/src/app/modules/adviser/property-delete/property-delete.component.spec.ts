import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDeleteComponent } from './property-delete.component';

describe('PropertyDeleteComponent', () => {
  let component: PropertyDeleteComponent;
  let fixture: ComponentFixture<PropertyDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
