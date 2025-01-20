import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-radio.component.html',
  styleUrl: './input-radio.component.scss',
})
export class InputRadioComponent {
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() model: string = '';

  @Output() modelChange = new EventEmitter<string>();

  onChange() {
    this.modelChange.emit(this.value);
  }
}
