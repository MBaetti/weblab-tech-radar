import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { TechnologyEntry } from '../../types/technology-entry';

@Injectable({ providedIn: 'root' })
export class TechApiService {
  private readonly baseUrl = '/api/technologies';
  // Aktuelle Liste der Technologien als Signal, welche vom Service verwaltet werden
  private readonly techSignal = signal<TechnologyEntry[]>([]);
  // Readonly Signal für Komponenten/Subscriber => tech-cards.component.ts
  readonly technologies = this.techSignal.asReadonly();

  constructor(private readonly httpClient: HttpClient) {
    this.loadInitial();
  }

  private loadInitial() {
    this.getTechnologies().subscribe(techs => this.techSignal.set(techs));
  }

  createTechnology(payload: Partial<TechnologyEntry>) {
    // Optionale Felder falls leer auf undefined wegen Contract mit Server
    if (payload.ring?.trim().length === 0) payload.ring = undefined;
    if (payload.classification?.trim().length === 0) payload.classification = undefined;

    // Tap, um die Liste der Technologien zu aktualisieren und Subscriber indirekt zu informieren, wenn http-Request erfolgreich war
    return this.httpClient.post<TechnologyEntry>(this.baseUrl, payload).pipe(
      tap(newTech => this.techSignal.update(techs => [...techs, newTech]))
    );
  }

  getTechnologies() {
    return this.httpClient.get<TechnologyEntry[]>(this.baseUrl);
    // Benötigt kein Tap, da keine Daten verändert werden
  }

  getTechnologyById(id: number) {
    return this.httpClient.get<TechnologyEntry>(`${this.baseUrl}/${id}`);
  }

  updateTechnology(id: number, payload: Partial<TechnologyEntry>) {
    return this.httpClient.put<TechnologyEntry>(`${this.baseUrl}/${id}`, payload).pipe(
      tap(updatedTech =>
        this.techSignal.update(techs => techs.map(t => t.id === updatedTech.id ? updatedTech : t)))
    );
  }

  deleteTechnology(id: number) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.techSignal.update(techs => techs.filter(t => t.id !== id)))
    );
  }
}
