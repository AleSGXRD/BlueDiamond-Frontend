import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldPhoneNumberComponent } from './form-field-phone-number.component';

describe('FormFieldPhoneNumberComponent', () => {
  let component: FormFieldPhoneNumberComponent;
  let fixture: ComponentFixture<FormFieldPhoneNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldPhoneNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFieldPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
