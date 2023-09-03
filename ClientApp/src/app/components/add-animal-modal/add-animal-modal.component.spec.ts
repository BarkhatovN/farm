import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnimalModalComponent } from './add-animal-modal.component';

describe('AddAnimalModalComponent', () => {
  let component: AddAnimalModalComponent;
  let fixture: ComponentFixture<AddAnimalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAnimalModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAnimalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
