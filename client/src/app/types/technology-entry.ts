export interface TechnologyEntry {
  id: number;
  name: string;
  category: TechCategory
  ring: TechRing;
  description: string;
  classification: string;
  date: Date;
}

export enum TechCategory {
  technique = 'technique',
  tool = 'tool',
  plattform = 'plattform',
  languageOrFramework = 'languageOrFramework'
}

export enum TechRing {
  adopt = 'adopt',
  trial = 'trial',
  assess = 'assess',
  hold = 'hold'
}

// Helper-Funktionen für deutsche Labels
export const TechCategoryLabels: Record<TechCategory, string> = {
  [TechCategory.technique]: 'Technik',
  [TechCategory.tool]: 'Werkzeug',
  [TechCategory.plattform]: 'Plattform',
  [TechCategory.languageOrFramework]: 'Sprache oder Framework'
};

export const TechRingLabels: Record<TechRing, string> = {
  [TechRing.adopt]: 'Adoptieren',
  [TechRing.trial]: 'Probieren',
  [TechRing.assess]: 'Bewerten',
  [TechRing.hold]: 'Halten'
};

