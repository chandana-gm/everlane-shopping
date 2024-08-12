import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDonationComponent } from './home-donation.component';

describe('HomeDonationComponent', () => {
  let component: HomeDonationComponent;
  let fixture: ComponentFixture<HomeDonationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeDonationComponent]
    });
    fixture = TestBed.createComponent(HomeDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
