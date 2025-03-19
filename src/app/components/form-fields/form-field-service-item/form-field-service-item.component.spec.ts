import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldServiceItemComponent } from './form-field-service-item.component';

describe('FormFieldServiceItemComponent', () => {
  let component: FormFieldServiceItemComponent;
  let fixture: ComponentFixture<FormFieldServiceItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldServiceItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFieldServiceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
