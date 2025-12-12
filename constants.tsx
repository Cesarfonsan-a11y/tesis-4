import { 
  BarChart3, 
  Database, 
  FileWarning, 
  ShieldCheck, 
  Store, 
  BookOpen, 
  Globe 
} from 'lucide-react';
import { DataSource, SourceCategory } from './types';

// Existing sources data enriched with "role" for Slide 4
export const SOURCES: DataSource[] = [
  {
    id: 'A',
    title: 'ANDEMOS',
    subtitle: 'Asociación Nacional de Movilidad Sostenible',
    category: SourceCategory.OFFICIAL,
    sourceType: 'Fuente Secundaria',
    color: '#3b82f6',
    icon: BarChart3,
    description: 'Estadísticas oficiales de ventas, precios, depreciación y segmentación.',
    role: 'Validación y calibración de modelos.',
    keyData: ['Ventas', 'Precios', 'Segmentación'],
    relevance: ['Calibración', 'Validación'],
    access: 'Público',
    citation: 'ANDEMOS (2025)'
  },
  {
    id: 'B',
    title: 'RUNT',
    subtitle: 'Registro Único Nacional de Tránsito',
    category: SourceCategory.OFFICIAL,
    sourceType: 'Fuente Primaria (Autoridad)',
    color: '#0ea5e9',
    icon: Database,
    description: 'Base oficial del parque automotor: antigüedad, geografía, traspasos.',
    role: 'Estructura real del mercado.',
    keyData: ['Parque automotor', 'Geografía', 'Traspasos'],
    relevance: ['Estructura', 'Demografía'],
    access: 'Restringido/Agregado',
    citation: 'MinTransporte (2025)'
  },
  {
    id: 'C',
    title: 'SIMIT Carro',
    subtitle: 'Sistema Integrado de Multas',
    category: SourceCategory.OFFICIAL,
    sourceType: 'Fuente Primaria',
    color: '#ef4444',
    icon: FileWarning,
    description: 'Historial de infracciones y sanciones.',
    role: 'Variable de riesgo y depreciación.',
    keyData: ['Infracciones', 'Sanciones'],
    relevance: ['Riesgo', 'Depreciación'],
    access: 'Público',
    citation: 'SIMIT (2025)'
  },
  {
    id: 'D',
    title: 'GarantiPlus',
    subtitle: 'Garantías Extendidas',
    category: SourceCategory.TECHNICAL,
    sourceType: 'Fuente Técnica (Privada)',
    color: '#10b981',
    icon: ShieldCheck,
    description: 'Datos técnicos, fallas y siniestralidad (bajo convenio).',
    role: 'Confiabilidad técnica y patrones de depreciación.',
    keyData: ['Fallas', 'Siniestralidad'],
    relevance: ['Calidad', 'Técnica'],
    access: 'Privado',
    citation: 'GarantiPlus'
  },
  {
    id: 'E',
    title: 'Concesionarios',
    subtitle: 'Red con Garantías',
    category: SourceCategory.MARKET,
    sourceType: 'Fuente Primaria',
    color: '#f59e0b',
    icon: Store,
    description: 'Precios reales, rotación, inventarios certificados.',
    role: 'Ground truth para modelos de precio justo.',
    keyData: ['Precio Real', 'Rotación'],
    relevance: ['Verdad de Mercado'],
    access: 'Privado',
    citation: 'Red Concesionarios'
  },
  {
    id: 'F',
    title: 'Fasecolda',
    subtitle: 'Guía de Valores',
    category: SourceCategory.OFFICIAL,
    sourceType: 'Fuente Institucional',
    color: '#6366f1',
    icon: BookOpen,
    description: 'Avalúos oficiales y depreciación técnica.',
    role: 'Línea base para contrastes de mercado.',
    keyData: ['Avalúos', 'Depreciación'],
    relevance: ['Línea Base'],
    access: 'Público',
    citation: 'Fasecolda (2024)'
  },
  {
    id: 'G',
    title: 'Portales Web',
    subtitle: 'Carroya, TuCarro, ML',
    category: SourceCategory.MARKET,
    sourceType: 'Fuente Primaria (Big Data)',
    color: '#8b5cf6',
    icon: Globe,
    description: 'Precios de oferta, características, ubicación, rotación.',
    role: 'Dinámica real de oferta y tendencias.',
    keyData: ['Oferta', 'Tendencias'],
    relevance: ['Big Data'],
    access: 'Scraping',
    citation: 'Portales Web'
  }
];

export const PRESENTATION_CONTENT = {
  cover: {
    mainUniversity: "Universidad del Rosario",
    university1: "Escuela de Administración",
    university2: "Escuela de Ingeniería, Ciencia y Tecnología",
    program: "Maestría en Business Analytics",
    projectType: "PROYECTO EMPRESARIAL",
    title: "OKTO",
    subtitle: "Plataforma de Business Analytics para la Comprensión y Proyección del Mercado de Vehículos Usados en Colombia",
    authors: ["Julio César Fonseca Sánchez", "Andrés Jair Bustamante Moscoso"],
    date: "25 de noviembre de 2025",
    projectUrl: "www.okto-analytics.co" // Placeholder for the document
  },
  objectives: {
    general: "Desarrollar y desplegar una plataforma analítica integral que unifique técnicas descriptivas y predictivas para entender y proyectar el mercado de vehículos usados en Colombia, habilitando decisiones estratégicas para todos los actores del ecosistema automotor.",
    specifics: [
      "Caracterizar el mercado mediante analítica descriptiva.",
      "Construir modelos predictivos de precios, demanda y depreciación.",
      "Desarrollar dashboards ejecutivos para visualización estratégica."
    ]
  },
  problem: {
    title: "¿Qué está pasando en el mercado?",
    points: [
      "Altísima dinámica, pero sin sistema centralizado de información.",
      "Datos dispersos (RUNT, ANDEMOS, Fasecolda, portales, concesionarios).",
      "Decisiones basadas en intuición, no en evidencia.",
      "No existe una plataforma analítica integral."
    ],
    conclusion: "El mercado opera con asimetrías de información y decisiones subóptimas.",
    evidence: {
      total: "7.8 Millones (Parque Automotor)",
      breakdown: [
        { label: "Automóviles", value: "4.0M" },
        { label: "Camionetas", value: "1.9M" },
        { label: "Camperos", value: "0.7M" },
        { label: "Otros", value: "1.0M" }
      ],
      insight: "No existe una herramienta que analice precios, depreciación y demanda con enfoque predictivo."
    },
    opportunity: [
      "Integrar fuentes dispersas",
      "Estimar precio justo y depreciación",
      "Cuantificar oferta/demanda",
      "Analizar mercado por región",
      "Alertas de tendencia",
      "Democratizar la inteligencia automotriz"
    ]
  },
  solution: {
    capabilities: [
      "Integración de datos (ETL Robustos)",
      "Analítica Descriptiva y Predictiva (ML)",
      "Proyecciones de precios y demanda",
      "Dashboards interactivos"
    ],
    matrix: {
      title: "Matriz de Oportunidad",
      desc: "Precio vs Kilometraje – Identificación de subvaloraciones",
      insight: "Detección de oportunidades que superan la revisión manual."
    },
    predictive: {
      example: "Renault Duster 2022",
      data: [
        { label: "Precio Venta", value: "$78M" },
        { label: "Precio Justo IA", value: "$75M", highlight: true }
      ],
      features: ["Proyección depreciación (1-3-5 años)", "Costo anual propiedad"]
    }
  },
  methodology: {
    steps: ["Comprensión del Negocio", "Comprensión de Datos", "Preparación (ETL)", "Modelado (ML)", "Evaluación", "Despliegue"],
    scope: {
      functional: "Indicadores, Modelos, Dashboards",
      tech: "Python, R, Scikit-Learn, Looker Studio/Power BI",
      data: "2020–2024, Nacional/Regional"
    }
  },
  impact: {
    sectors: [
      { name: "Concesionarios", benefit: "Pricing inteligente y optimización de inventarios" },
      { name: "Aseguradoras", benefit: "Modelos de riesgo basados en evidencia" },
      { name: "Compradores", benefit: "Precio justo y proyección de costos" },
      { name: "Mercado", benefit: "Reducción de asimetrías y decisiones data-driven" }
    ],
    pricingFocus: {
      title: "¿Qué es Pricing Inteligente?",
      definition: "Es pasar de fijar precios por 'intuición' o 'costo + margen' a una Optimización Dinámica. El algoritmo busca el precio máximo que el mercado tolera para vender el vehículo en un tiempo objetivo (ej. 30 días), considerando la depreciación diaria y la competencia.",
      tags: ["Elasticidad Precio/Demanda", "Rotación de Inventario", "Margen de Utilidad"],
      example: {
        title: "Ejemplo Simple: Renault Duster 2020",
        traditional: {
          label: "Intuición / Costo",
          price: "$75.0M",
          time: "45 días",
          loss: "-$900k (Depreciación)"
        },
        okto: {
          label: "Algoritmo OKTO",
          price: "$76.2M",
          time: "29 días",
          gain: "+$1.2M (Margen Extra)"
        },
        impacts: [
           "Mayor Margen",
           "Menor Tiempo en Lote",
           "Menor Depreciación Acumulada"
        ]
      }
    }
  }
};