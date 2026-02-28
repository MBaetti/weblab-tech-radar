import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { TechApiService } from './tech-api.service';
import { TechnologyEntry, TechCategory, TechRing } from '../../types/technology-entry';

const baseUrl = '/api/technologies';

const mockTech: TechnologyEntry = {
  id: 1,
  name: 'ArgoCD',
  category: TechCategory.tool,
  ring: TechRing.adopt,
  description: 'GitOps-Tool',
  classification: 'Empfohlen',
  entryDate: new Date(),
  changeDate: new Date(),
  published: false,
  publicationDate: new Date(),
};

describe('TechApiService', () => {
  let service: TechApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(TechApiService);
    httpMock = TestBed.inject(HttpTestingController);
    // loadInitial()-Request abfangen
    httpMock.expectOne(baseUrl).flush([]);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load technologies on init and update the signal', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    const freshService = TestBed.inject(TechApiService);
    const freshHttpMock = TestBed.inject(HttpTestingController);

    freshHttpMock.expectOne(baseUrl).flush([mockTech]);

    expect(freshService.technologies()).toEqual([mockTech]);
    freshHttpMock.verify();
  });

  it('should add a technology to the signal after createTechnology()', () => {
    service.createTechnology({ name: 'ArgoCD', category: TechCategory.tool, description: 'GitOps-Tool' }).subscribe();

    httpMock.expectOne({ method: 'POST', url: baseUrl }).flush(mockTech);

    expect(service.technologies()).toContain(mockTech);
  });

  it('should set ring to undefined if empty string on createTechnology()', () => {
    const payload = { name: 'ArgoCD', category: TechCategory.tool, description: 'Test', ring: '' as TechRing };
    service.createTechnology(payload).subscribe();

    httpMock.expectOne({ method: 'POST', url: baseUrl }).flush(mockTech);

    expect(payload.ring).toBeUndefined();
  });

  it('should set classification to undefined if empty string on createTechnology()', () => {
    const payload = { name: 'ArgoCD', category: TechCategory.tool, description: 'Test', classification: '' };
    service.createTechnology(payload).subscribe();

    httpMock.expectOne({ method: 'POST', url: baseUrl }).flush(mockTech);

    expect(payload.classification).toBeUndefined();
  });

  it('should return all technologies via getTechnologies()', () => {
    let result: TechnologyEntry[] = [];
    service.getTechnologies().subscribe(techs => result = techs);

    httpMock.expectOne({ method: 'GET', url: baseUrl }).flush([mockTech]);

    expect(result).toEqual([mockTech]);
  });

  it('should return a technology by id via getTechnologyById()', () => {
    let result: TechnologyEntry | undefined;
    service.getTechnologyById(1).subscribe(tech => result = tech);

    httpMock.expectOne({ method: 'GET', url: `${baseUrl}/1` }).flush(mockTech);

    expect(result).toEqual(mockTech);
  });

  it('should update the signal after updateTechnology()', () => {
    // Technologie ins Signal laden
    service.createTechnology({ name: 'ArgoCD' }).subscribe();
    httpMock.expectOne({ method: 'POST', url: baseUrl }).flush(mockTech);

    const updated = { ...mockTech, ring: TechRing.trial };
    service.updateTechnology(1, { ring: TechRing.trial }).subscribe();
    httpMock.expectOne({ method: 'PUT', url: `${baseUrl}/1` }).flush(updated);

    expect(service.technologies()[0].ring).toBe(TechRing.trial);
  });

  it('should remove the technology from the signal after deleteTechnology()', () => {
    // Technologie ins Signal laden
    service.createTechnology({ name: 'ArgoCD' }).subscribe();
    httpMock.expectOne({ method: 'POST', url: baseUrl }).flush(mockTech);

    service.deleteTechnology(1).subscribe();
    httpMock.expectOne({ method: 'DELETE', url: `${baseUrl}/1` }).flush(null);

    expect(service.technologies()).toEqual([]);
  });
});
