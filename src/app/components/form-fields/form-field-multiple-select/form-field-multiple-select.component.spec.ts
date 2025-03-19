import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldMultipleSelectComponent } from './form-field-multiple-select.component';

describe('FormFieldMultipleSelectComponent', () => {
  let component: FormFieldMultipleSelectComponent;
  let fixture: ComponentFixture<FormFieldMultipleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldMultipleSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFieldMultipleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
