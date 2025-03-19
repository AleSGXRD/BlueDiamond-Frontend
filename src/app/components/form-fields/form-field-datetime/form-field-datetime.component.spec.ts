import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldDatetimeComponent } from './form-field-datetime.component';

describe('FormFieldDatetimeComponent', () => {
  let component: FormFieldDatetimeComponent;
  let fixture: ComponentFixture<FormFieldDatetimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldDatetimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFieldDatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
