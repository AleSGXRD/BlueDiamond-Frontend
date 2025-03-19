import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseraccountPageComponent } from './useraccount-page.component';

describe('UseraccountPageComponent', () => {
  let component: UseraccountPageComponent;
  let fixture: ComponentFixture<UseraccountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UseraccountPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseraccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
