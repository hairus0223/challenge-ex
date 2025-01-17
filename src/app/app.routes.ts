import { Routes } from '@angular/router';
import { ExhibitorsRegistrationComponent } from './pages/exhibitors-registration/exhibitors-registration.component';

export const routes: Routes = [
  { path: '', redirectTo: '/exhibitors-registration', pathMatch: 'full' },
  {
    path: 'exhibitors-registration',
    component: ExhibitorsRegistrationComponent,
  },
];
