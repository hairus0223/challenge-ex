import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-exhibitor-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exhibitor-dialog.component.html',
  styleUrl: './exhibitor-dialog.component.scss',
})
export class ExhibitorDialogComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @ViewChild('modalContent') modalContent: ElementRef | undefined;
  uniqueCode: string = '';

  ngOnInit(): void {
    this.generateUniqueCode();
  }

  generateUniqueCode(): void {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    this.uniqueCode = Array.from({ length: 5 })
      .map(() =>
        characters.charAt(Math.floor(Math.random() * characters.length))
      )
      .join('');
  }

  saveAsImage(): void {
    if (this.modalContent) {
      html2canvas(this.modalContent.nativeElement).then((canvas) => {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'registration-completed.png';
        link.click();
      });
    }
  }

  closeModal(): void {
    this.close.emit();
  }
}
