import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiasterRegisterComponent } from './diaster-register.component';

describe('DiasterRegisterComponent', () => {
  let component: DiasterRegisterComponent;
  let fixture: ComponentFixture<DiasterRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiasterRegisterComponent]
    });
    fixture = TestBed.createComponent(DiasterRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
