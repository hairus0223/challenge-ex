import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitorsRegistrationComponent } from './exhibitors-registration.component';

describe('ExhibitorsRegistrationComponent', () => {
  let component: ExhibitorsRegistrationComponent;
  let fixture: ComponentFixture<ExhibitorsRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitorsRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExhibitorsRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
