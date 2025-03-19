import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEstimatesComponent } from './client-estimates.component';

describe('ClientEstimatesComponent', () => {
  let component: ClientEstimatesComponent;
  let fixture: ComponentFixture<ClientEstimatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientEstimatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientEstimatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
