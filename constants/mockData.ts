export type WasteCategory = 'recyclable' | 'compost' | 'electronic' | 'hazardous' | 'general';

export interface WasteItem {
  id: string;
  name: string;
  category: WasteCategory;
  description: string;
  disposalInstructions: string;
  imageUrl: string;
  confidence: number;
  timestamp: string;
}

export const WASTE_CATEGORIES = {
  recyclable: {
    name: 'Reciclável',
    color: '#4285F4',
    icon: 'recycle',
    description: 'Materiais que podem ser reciclados e reprocessados em novos produtos.',
  },
  compost: {
    name: 'Orgânico',
    color: '#34A853',
    icon: 'leaf',
    description: 'Resíduos orgânicos que podem se decompor naturalmente e ser usados como fertilizante.',
  },
  electronic: {
    name: 'Lixo Eletrônico',
    color: '#FBBC05',
    icon: 'cpu',
    description: 'Dispositivos ou componentes eletrônicos descartados que requerem tratamento especial.',
  },
  hazardous: {
    name: 'Perigoso',
    color: '#EA4335',
    icon: 'alert-triangle',
    description: 'Materiais que representam riscos potenciais à saúde humana ou ao meio ambiente.',
  },
  general: {
    name: 'Lixo Comum',
    color: '#9AA0A6',
    icon: 'trash',
    description: 'Itens não recicláveis e não perigosos que vão para o aterro sanitário.',
  },
};

export const MOCK_HISTORY_ITEMS: WasteItem[] = [
  {
    id: '1',
    name: 'Garrafa PET',
    category: 'recyclable',
    description: 'Garrafa plástica de água',
    disposalInstructions: 'Enxágue e coloque no recipiente de reciclagem. Remova e recicle a tampa separadamente se exigido pelas diretrizes locais.',
    imageUrl: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg',
    confidence: 0.92,
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '2',
    name: 'Casca de Banana',
    category: 'compost',
    description: 'Resíduo orgânico de alimento',
    disposalInstructions: 'Coloque no recipiente de compostagem ou coleta de resíduos orgânicos. Pode ser compostado em casa.',
    imageUrl: 'https://images.pexels.com/photos/1166648/pexels-photo-1166648.jpeg',
    confidence: 0.88,
    timestamp: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '3',
    name: 'Smartphone Antigo',
    category: 'electronic',
    description: 'Dispositivo eletrônico descartado',
    disposalInstructions: 'Leve a um centro de coleta de lixo eletrônico. Muitas lojas oferecem programas de reciclagem para dispositivos eletrônicos.',
    imageUrl: 'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg',
    confidence: 0.85,
    timestamp: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: '4',
    name: 'Lata de Tinta',
    category: 'hazardous',
    description: 'Recipiente com resíduo de tinta',
    disposalInstructions: 'Leve a uma instalação de coleta de resíduos perigosos. Nunca despeje tinta em ralos ou coloque no lixo comum.',
    imageUrl: 'https://images.pexels.com/photos/5587858/pexels-photo-5587858.jpeg',
    confidence: 0.78,
    timestamp: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    id: '5',
    name: 'Copo de Café',
    category: 'general',
    description: 'Copo de papel com revestimento plástico',
    disposalInstructions: 'Descarte no lixo comum. Estes copos geralmente não podem ser reciclados devido ao revestimento plástico.',
    imageUrl: 'https://images.pexels.com/photos/1061581/pexels-photo-1061581.jpeg',
    confidence: 0.95,
    timestamp: new Date(Date.now() - 432000000).toISOString(),
  },
];
