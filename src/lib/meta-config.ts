import { Metadata } from 'next';

type PageMetadata = {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
};

const defaultMetadata: Metadata = {
  title: 'DG Sports Management | Gestão de Atletas e Contratos Esportivos',
  description: 'Plataforma completa para gestão de atletas, contratos, finanças e análise de desempenho esportivo.',
  keywords: 'gestão de atletas, contratos esportivos, análise de desempenho, finanças esportivas',
  authors: [{ name: 'DG Sports' }],
  creator: 'DG Sports Management',
  publisher: 'DG Sports Management',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const pageMetadata: Record<string, PageMetadata> = {
  atletas: {
    title: 'Gestão de Atletas | DG Sports Management',
    description: 'Gerencie perfis de atletas, acompanhe desempenho e otimize carreiras esportivas com nossa plataforma especializada.',
    keywords: ['gestão de atletas', 'perfil esportivo', 'carreira esportiva', 'atletas profissionais'],
    image: '/images/atletas-banner.jpg'
  },
  contratos: {
    title: 'Contratos Esportivos | DG Sports Management',
    description: 'Gerencie contratos esportivos, negociações e documentação legal de forma eficiente e segura.',
    keywords: ['contratos esportivos', 'negociações', 'documentos legais', 'gestão de contratos'],
    image: '/images/contratos-banner.jpg'
  },
  financas: {
    title: 'Gestão Financeira | DG Sports Management',
    description: 'Controle financeiro completo para atletas e organizações esportivas. Gerencie receitas, despesas e investimentos.',
    keywords: ['gestão financeira', 'finanças esportivas', 'controle financeiro', 'investimentos'],
    image: '/images/financas-banner.jpg'
  },
  desempenho: {
    title: 'Análise de Desempenho | DG Sports Management',
    description: 'Análise detalhada de desempenho esportivo com métricas avançadas e relatórios personalizados.',
    keywords: ['análise de desempenho', 'métricas esportivas', 'estatísticas', 'avaliação'],
    image: '/images/desempenho-banner.jpg'
  },
  relatorios: {
    title: 'Relatórios Esportivos | DG Sports Management',
    description: 'Relatórios completos e insights estratégicos para tomada de decisão no ambiente esportivo.',
    keywords: ['relatórios esportivos', 'análise estratégica', 'insights', 'tomada de decisão'],
    image: '/images/relatorios-banner.jpg'
  }
};

export function generateMetadata(path: string): Metadata {
  const page = path.split('/')[1] || 'home';
  const metadata = pageMetadata[page];

  if (!metadata) return defaultMetadata;

  return {
    ...defaultMetadata,
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords.join(', '),
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: metadata.image ? [{ url: metadata.image }] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: metadata.image ? [metadata.image] : undefined,
    },
  };
}