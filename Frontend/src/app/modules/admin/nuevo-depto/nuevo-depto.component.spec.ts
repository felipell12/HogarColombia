import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoDeptoComponent } from './nuevo-depto.component';

describe('NuevoDeptoComponent', () => {
  let component: NuevoDeptoComponent;
  let fixture: ComponentFixture<NuevoDeptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoDeptoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoDeptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
