import { LucideIcon } from 'lucide-react';

export enum SourceCategory {
  OFFICIAL = 'Oficial / Gremial',
  TECHNICAL = 'Técnica / Garantías',
  MARKET = 'Mercado / Transaccional'
}

export type PresentationSectionId = 'cover' | 'objectives' | 'sources' | 'problem' | 'solution' | 'methodology' | 'conclusion';

export interface DataSource {
  id: string;
  title: string;
  subtitle: string;
  category: SourceCategory;
  sourceType: 'Fuente Primaria' | 'Fuente Secundaria' | 'Fuente Institucional' | 'Fuente Primaria (Autoridad)' | 'Fuente Técnica (Privada)' | 'Fuente Primaria (Big Data)';
  description: string;
  keyData: string[];
  relevance: string[];
  access: string;
  citation: string;
  icon: LucideIcon;
  color: string;
  role?: string; // Added for the executive summary view
}

export interface ChartDataPoint {
  name: string;
  value: number;
  category: string;
}