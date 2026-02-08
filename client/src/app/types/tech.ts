import {TechCategory} from './tech-category';
import {TechRing} from './tech-ring';

export interface Tech{
  id: number;
  name: string;
  category: TechCategory
  ring: TechRing;
  description: string;
  classification: string;
  date: Date;
}
