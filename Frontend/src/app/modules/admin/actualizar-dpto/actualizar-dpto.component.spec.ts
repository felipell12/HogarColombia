import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarDptoComponent } from './actualizar-dpto.component';

describe('ActualizarDptoComponent', () => {
  let component: ActualizarDptoComponent;
  let fixture: ComponentFixture<ActualizarDptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarDptoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarDptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
