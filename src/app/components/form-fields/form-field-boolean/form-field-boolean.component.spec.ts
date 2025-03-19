import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldBooleanComponent } from './form-field-boolean.component';

describe('FormFieldBooleanComponent', () => {
  let component: FormFieldBooleanComponent;
  let fixture: ComponentFixture<FormFieldBooleanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldBooleanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFieldBooleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
