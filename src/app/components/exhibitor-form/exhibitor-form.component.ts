import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ExhibitorCardComponent } from '../exhibitor-card/exhibitor-card.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Company, ErrorMessage, Exhibitor } from '../../models/exhibitor.model';
import { InputRadioComponent } from '../ui/input-radio/input-radio.component';
import { ExhibitorDialogComponent } from '../exhibitor-dialog/exhibitor-dialog.component';
import { ExhibitorService } from '../../services/exhibitor.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-exhibitor-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ExhibitorCardComponent,
    InputRadioComponent,
    ExhibitorDialogComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './exhibitor-form.component.html',
  styleUrl: './exhibitor-form.component.scss',
})
export class ExhibitorFormComponent implements OnInit {
  @Input() isLoading: boolean = false;
  @Input() companies: Company[] = [];
  @Input() countries: string[] = [];
  @Output() loadCompanyList = new EventEmitter<Company>();

  public filteredCompanies: Company[] = [];
  private exhibitorService = inject(ExhibitorService);

  form!: FormGroup;
  selectedEvent: string = '';
  selectedCompany: string = '';
  errorMessages: any[] = [];
  isSubmission: boolean = false;
  isLoadingSubmission: boolean = false;
  isModalVisible = false;

  events = [
    { label: 'FHA-Food & Beverage', value: 'FHA-Food & Beverage' },
    { label: 'Prowine Singapore', value: 'Prowine Singapore' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.addExhibitor();
  }

  get failedSubmissionCount(): number {
    return this.errorMessages.filter((item) => !item.status).length;
  }

  get totalSubmissions(): number {
    return this.getExhibitorControls().length;
  }

  getExhibitorControls(): FormGroup[] {
    const exhibitorsArray = this.form.get('exhibitors') as FormArray;
    return exhibitorsArray.controls as FormGroup[];
  }

  initializeForm() {
    this.form = this.fb.group({
      event: ['', Validators.required],
      company: ['', Validators.required],
      exhibitors: this.fb.array([]),
    });
  }

  createExhibitorGroup(): FormGroup {
    return this.fb.group({
      S_name_on_badge: ['', Validators.required],
      S_email_address: ['', [Validators.required, Validators.email]],
      S_job_title: ['', Validators.required],
      S_country: ['', Validators.required],
      S_company_on_badge: ['', Validators.required],
    });
  }

  addExhibitor() {
    const exhibitorsArray = this.form.get('exhibitors') as FormArray;
    exhibitorsArray.push(this.createExhibitorGroup());
  }

  removeExhibitor(index: number) {
    const exhibitorsArray = this.form.get('exhibitors') as FormArray;
    exhibitorsArray.removeAt(index);
  }

  onEventChange(value: string) {
    this.selectedEvent = value;
    this.filteredCompanies = this.companies.filter(
      (company) => company.S_event === value
    );
    this.form.patchValue({ company: '', event: this.selectedEvent });
    this.selectedCompany = ''; // Reset company selection
    this.errorMessages = [];
  }

  onCompanyChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    this.selectedCompany = selectedValue;
    this.form.patchValue({ selectedValue });
  }

  shouldShowExhibitorCard(index: number): boolean {
    if (!this.isSubmission) {
      return true; // Show exhibitor card if not in submission mode
    }
    return !this.errorMessages[index]?.status; // Show exhibitor card only if no error
  }

  getErrorMessage(index: number): string | null {
    if (
      this.isSubmission &&
      this.failedSubmissionCount > 0 &&
      !this.errorMessages[index]?.status
    ) {
      return this.errorMessages[index]?.message || null;
    }
    return null; // No error message if conditions are not met
  }

  showRegistrationModal(): void {
    this.isModalVisible = true;
  }

  handleCloseModal(): void {
    this.isModalVisible = false;
  }

  onSubmit() {
    this.errorMessages = [];
    this.isLoadingSubmission = true;
    if (this.form.valid) {
      this.isSubmission = true;
      const exhibitors: Exhibitor[] = this.getExhibitorControls().map(
        (group, index) => ({
          S_added_via: 'Web Form',
          // S_company: index > 0 ? 'Google' : this.selectedCompany, // for test error
          S_company: this.selectedCompany,
          S_name_on_badge: group.get('S_name_on_badge')?.value,
          S_email_address: group.get('S_email_address')?.value,
          S_job_title: group.get('S_job_title')?.value,
          S_country: group.get('S_country')?.value,
          S_company_on_badge: group.get('S_company_on_badge')?.value,
          SB_event_fha: this.selectedEvent === 'FHA-Food & Beverage',
          SB_event_prowine: this.selectedEvent === 'Prowine Singapore',
        })
      );

      this.exhibitorService
        .addMultipleExhibitor(exhibitors)
        .pipe(
          finalize(() => {
            this.isLoadingSubmission = false;
            this.errorMessages = [];
            if (!this.failedSubmissionCount) {
              this.showRegistrationModal();
            }
          })
        )
        .subscribe(
          (responses) => {
            responses.forEach((result, index) => {
              if (result.error) {
                this.errorMessages.push(result.error.error);
              } else {
                this.errorMessages.push(result.response);
              }
            });
          },
          (error) => {
            console.error('Error registering exhibitors:', error);
          }
        );
    } else {
      console.log('Form is invalid');
      this.isLoadingSubmission = false;
    }
  }
}
