import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TechApiService {
  constructor(private readonly http: HttpClient) {}

  submitTechnology(payload: any): Observable<any> {
    console.log("Sending payload: " + payload);
    return this.http.post('/api/technologies', payload);
  }
}
