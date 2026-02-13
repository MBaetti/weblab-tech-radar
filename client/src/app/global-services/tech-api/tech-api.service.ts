import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TechnologyEntry } from '../../types/technology-entry';

@Injectable({ providedIn: 'root' })
export class TechApiService {
  private readonly baseUrl = '/api/technologies';

  constructor(private readonly httpClient: HttpClient) {}

  createTechnology(payload: Partial<TechnologyEntry>): Observable<TechnologyEntry> {
    console.log('TechApiService: createTechnology() called, URL:', this.baseUrl, ', Payload:', payload);
    return this.httpClient.post<TechnologyEntry>(this.baseUrl, payload);
  }

  getTechnologies(): Observable<TechnologyEntry[]> {
    console.log('TechApiService: getTechnologies() called, URL:', this.baseUrl);
    return this.httpClient.get<TechnologyEntry[]>(this.baseUrl);
  }

  getTechnologyById(id: number): Observable<TechnologyEntry> {
    console.log('TechApiService: getTechnologyById() called, URL:', this.baseUrl, ', ID:', id);
    return this.httpClient.get<TechnologyEntry>(`${this.baseUrl}/${id}`);
  }

  updateTechnology(id: number, payload: Partial<TechnologyEntry>): Observable<TechnologyEntry> {
    console.log('TechApiService: updateTechnology() called, URL:', this.baseUrl, ', ID:', id, ', Payload:', payload);
    return this.httpClient.put<TechnologyEntry>(`${this.baseUrl}/${id}`, payload);
  }

  deleteTechnology(id: number): Observable<TechnologyEntry> {
    console.log('TechApiService: deleteTechnology() called, URL:', this.baseUrl, ', ID:', id);
    return this.httpClient.delete<TechnologyEntry>(`${this.baseUrl}/${id}`);
  }
}
