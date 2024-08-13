import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDonationComponent } from './client-donation.component';

describe('ClientDonationComponent', () => {
  let component: ClientDonationComponent;
  let fixture: ComponentFixture<ClientDonationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientDonationComponent]
    });
    fixture = TestBed.createComponent(ClientDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
