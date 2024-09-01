import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualGenreComponent } from './individualGenre.component';

describe('GenreIndividualComponent', () => {
  let component: IndividualGenreComponent;
  let fixture: ComponentFixture<IndividualGenreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndividualGenreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndividualGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
