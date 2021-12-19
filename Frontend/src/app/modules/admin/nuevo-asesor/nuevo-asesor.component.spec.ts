import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAsesorComponent } from './nuevo-asesor.component';

describe('NuevoAsesorComponent', () => {
  let component: NuevoAsesorComponent;
  let fixture: ComponentFixture<NuevoAsesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoAsesorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoAsesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
