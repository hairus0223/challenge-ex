import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-exhibitor-card',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './exhibitor-card.component.html',
  styleUrl: './exhibitor-card.component.scss',
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'translateY(-10px)' })
        ),
      ]),
    ]),
  ],
})
export class ExhibitorCardComponent {
  @Input() exhibitorIndex!: number;
  @Input() formGroup!: FormGroup;
  @Input() countries: string[] = [];
  @Input() errorMessage: string | null = '';
  @Output() removeExhibitor = new EventEmitter<number>();

  isVisible = true;

  getError(controlName: string): string | null {
    const control = this.formGroup.get(controlName);

    if (control?.invalid && (control.dirty || control.touched)) {
      if (control.errors) {
        if (control.errors['required']) {
          return 'This field is required';
        }
        if (control.errors['email']) {
          return 'Please enter a valid email address';
        }
        if (control.errors['minlength']) {
          return `Minimum length is ${control.errors['minlength'].requiredLength}`;
        }
        if (control.errors['maxlength']) {
          return `Maximum length is ${control.errors['maxlength'].requiredLength}`;
        }
        if (control.errors['pattern']) {
          return 'Invalid format';
        }
        if (control.errors['email'] && !control.value) {
          return 'Email cannot be empty';
        }

        // Handle other types of validation errors
        return 'This field is invalid';
      }
    }
    return null;
  }

  onCountryChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.formGroup.patchValue({ S_country: selectedValue });
  }

  remove() {
    this.isVisible = false; // Start fade-out animation
    setTimeout(() => {
      this.removeExhibitor.emit(this.exhibitorIndex); // Emit after animation ends
    }, 300);
  }
}
