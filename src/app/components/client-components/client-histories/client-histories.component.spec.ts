import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientHistoriesComponent } from './client-histories.component';

describe('ClientHistoriesComponent', () => {
  let component: ClientHistoriesComponent;
  let fixture: ComponentFixture<ClientHistoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientHistoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientHistoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
