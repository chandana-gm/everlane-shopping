import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisasterTrackingApprovelComponent } from './disaster-tracking-approvel.component';

describe('DisasterTrackingApprovelComponent', () => {
  let component: DisasterTrackingApprovelComponent;
  let fixture: ComponentFixture<DisasterTrackingApprovelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisasterTrackingApprovelComponent]
    });
    fixture = TestBed.createComponent(DisasterTrackingApprovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
