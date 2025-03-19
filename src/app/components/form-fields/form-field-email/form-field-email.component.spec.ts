import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldEmailComponent } from './form-field-email.component';

describe('FormFieldEmailComponent', () => {
  let component: FormFieldEmailComponent;
  let fixture: ComponentFixture<FormFieldEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFieldEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
