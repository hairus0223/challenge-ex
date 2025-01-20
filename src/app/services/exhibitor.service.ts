import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import {
  Exhibitor,
  AddExhibitorResponse,
  CompanyResponse,
} from '../models/exhibitor.model';

@Injectable({
  providedIn: 'root',
})
export class ExhibitorService {
  private baseUrl = 'https://staging-fha-2024.occamlab.com.sg/api';
  private baseUrlPublic = 'https://staging-fha-2024.occamlab.com.sg/public';

  constructor(private http: HttpClient) {}

  getCompanies(payload: any): Observable<CompanyResponse> {
    return this.http.post<CompanyResponse>(
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

  addMultipleExhibitor(
    payloads: Exhibitor[]
  ): Observable<
    { response: AddExhibitorResponse | null; error: any | null }[]
  > {
    const requests = payloads.map((payload) =>
      this.addExhibitor(payload).pipe(
        map((response) => ({ response, error: null })),
        catchError((error) => of({ response: null, error }))
      )
    );
    return forkJoin(requests);
  }

  getCountries(): Observable<any> {
    return this.http.get(`${this.baseUrlPublic}/provinces.json`);
  }
}
