import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionContractComponent } from './subscriptionContract.component';

describe('SubscriptionContractComponent', () => {
  let component: SubscriptionContractComponent;
  let fixture: ComponentFixture<SubscriptionContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubscriptionContractComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubscriptionContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
