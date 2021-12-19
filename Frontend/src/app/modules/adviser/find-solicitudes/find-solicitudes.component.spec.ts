import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindSolicitudesComponent } from './find-solicitudes.component';

describe('FindSolicitudesComponent', () => {
  let component: FindSolicitudesComponent;
  let fixture: ComponentFixture<FindSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindSolicitudesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
