import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalldrobeComponent } from './walldrobe.component';

describe('WalldrobeComponent', () => {
  let component: WalldrobeComponent;
  let fixture: ComponentFixture<WalldrobeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalldrobeComponent]
    });
    fixture = TestBed.createComponent(WalldrobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
