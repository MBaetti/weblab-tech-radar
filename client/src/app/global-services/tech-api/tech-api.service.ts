import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { TechnologyEntry } from '../../types/technology-entry';

@Injectable({ providedIn: 'root' })
export class TechApiService {
  private readonly baseUrl = '/api/technologies';
  // Aktuelle Liste der Technologien, welche vom Service verwaltet werden
  private readonly techSubject = new BehaviorSubject<TechnologyEntry[]>([]);
  // Liste der Technologien als Observable, damit Komponenten (tech-cards-component) sich darauf abonnieren können und automatisch Updates erhalten
  technologies$ = this.techSubject.asObservable();

  constructor(private readonly httpClient: HttpClient) {
    this.loadInitial();
  }

  private loadInitial() {
    this.getTechnologies().subscribe(techs => this.techSubject.next(techs));
  }

  createTechnology(payload: Partial<TechnologyEntry>) {
    // Optionale Felder falls leer auf undefined wegen Contract mit Server
    if (payload.ring?.trim().length === 0) payload.ring = undefined;
    if (payload.classification?.trim().length === 0) payload.classification = undefined;

    // Tap, um die Liste der Technologien zu aktualisieren und Subscriber indirekt zu informieren
    return this.httpClient.post<TechnologyEntry>(this.baseUrl, payload).pipe(
      tap(newTech => this.techSubject.next([...this.techSubject.value, newTech]))
    );
  }

  getTechnologies() {
    return this.httpClient.get<TechnologyEntry[]>(this.baseUrl);
    // Benötigt kein Tap, da keine Daten verändert werden
  }

  getTechnologyById(id: number) {
    console.log('TechApiService: getTechnologyById() called, URL:', this.baseUrl, ', ID:', id);
    return this.httpClient.get<TechnologyEntry>(`${this.baseUrl}/${id}`);
    // Benötigt kein Tap, da keine Daten verändert werden
  }

  updateTechnology(id: number, payload: Partial<TechnologyEntry>) {
    console.log('TechApiService: updateTechnology() called, URL:', this.baseUrl, ', ID:', id, ', Payload:', payload);
    return this.httpClient.put<TechnologyEntry>(`${this.baseUrl}/${id}`, payload).pipe(
      tap(updatedTech =>
        this.techSubject.next(this.techSubject.value.map(t => t.id === updatedTech.id ? updatedTech : t)))
    );
  }

  deleteTechnology(id: number) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        const updated = this.techSubject.value.filter(t => t.id !== id);
        this.techSubject.next(updated);
      })
    );
  }
}
