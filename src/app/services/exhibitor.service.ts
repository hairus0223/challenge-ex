import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Company,
  Exhibitor,
  AddExhibitorResponse,
} from '../models/exhibitor.model';

@Injectable({
  providedIn: 'root',
})
export class ExhibitorService {
  private baseUrl = 'https://staging-fha-2024.occamlab.com.sg/api';
  private baseUrlPublic = 'https://staging-fha-2024.occamlab.com.sg/public';

  constructor(private http: HttpClient) {}

  getCompanies(payload: any): Observable<Company[]> {
    return this.http.post<Company[]>(
      `${this.baseUrl}/exhibitor-company-list`,
      payload
    );
  }

  addExhibitor(payload: Exhibitor): Observable<AddExhibitorResponse> {
    return this.http.post<AddExhibitorResponse>(
      `${this.baseUrl}/add-exhibitor`,
      payload
    );
  }

  getCountries(): Observable<any> {
    return this.http.get(`${this.baseUrlPublic}/provinces.json`);
  }
}
