import { Component, inject, OnInit } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { ExhibitorFormComponent } from '../../components/exhibitor-form/exhibitor-form.component';
import { ExhibitorService } from '../../services/exhibitor.service';
import { Company } from '../../models/exhibitor.model';
import { finalize } from 'rxjs';
import { LoadingOverlayComponent } from '../../components/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-exhibitors-registration',
  standalone: true,
  imports: [BannerComponent, ExhibitorFormComponent, LoadingOverlayComponent],
  templateUrl: './exhibitors-registration.component.html',
  styleUrl: './exhibitors-registration.component.scss',
})
export class ExhibitorsRegistrationComponent implements OnInit {
  private exhibitorService = inject(ExhibitorService);

  public isLoading = false;
  public companies: Company[] = [];
  public countries: string[] = [];
  public selectedEvent: string = '';

  ngOnInit(): void {
    this.loadCompanies();
    this.fetchCountries();
  }

  loadCompanies(): void {
    this.isLoading = true;
    this.exhibitorService
      .getCompanies({})
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((data) => {
        this.companies = data?.message;
      });
  }

  fetchCountries() {
    this.isLoading = true;

    this.exhibitorService
      .getCountries()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        (data: { country: string }[]) => {
          this.countries = [...new Set(data.map((item: any) => item.country))];
        },
        (error) => {
          console.error('Failed to fetch countries', error);
        }
      );
  }
}
