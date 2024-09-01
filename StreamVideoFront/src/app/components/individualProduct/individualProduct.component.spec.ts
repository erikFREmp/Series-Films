import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualProductComponent } from './individualProduct.component';

describe('ProductIndividualComponent', () => {
  let component: IndividualProductComponent;
  let fixture: ComponentFixture<IndividualProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndividualProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndividualProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
