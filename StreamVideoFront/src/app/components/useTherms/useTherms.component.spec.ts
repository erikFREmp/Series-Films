import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseThermsComponent } from './useTherms.component';

describe('UseThermsComponent', () => {
  let component: UseThermsComponent;
  let fixture: ComponentFixture<UseThermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UseThermsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UseThermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
