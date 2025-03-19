import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldDaysOfWeekComponent } from './form-field-days-of-week.component';

describe('FormFieldDaysOfWeekComponent', () => {
  let component: FormFieldDaysOfWeekComponent;
  let fixture: ComponentFixture<FormFieldDaysOfWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldDaysOfWeekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFieldDaysOfWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
