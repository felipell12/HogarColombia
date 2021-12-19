import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesoresComponent } from './asesores.component';

describe('AsesoresComponent', () => {
  let component: AsesoresComponent;
  let fixture: ComponentFixture<AsesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsesoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
