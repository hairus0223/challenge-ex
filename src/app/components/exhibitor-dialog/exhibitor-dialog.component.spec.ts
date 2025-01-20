import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitorDialogComponent } from './exhibitor-dialog.component';

describe('ExhibitorDialogComponent', () => {
  let component: ExhibitorDialogComponent;
  let fixture: ComponentFixture<ExhibitorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExhibitorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
