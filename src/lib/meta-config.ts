import { Metadata } from 'next';
import { Locale, i18n } from './i18n-config';

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

export function generateMetadata(path: string, locale: Locale = 'pt-BR'): Metadata {
  const pagePath = path.endsWith('/') ? path.slice(0, -1) : path;
  const pageKey = pagePath.substring(1) || '/';
  const page = pageMetadata[pageKey];

  if (!page) {
    return defaultMetadata;
  }

  // Ajustar título e descrição com base no idioma
  let title = page.title;
  let description = page.description;
  
  if (locale === 'en-US') {
    title = title.replace('Gestão de', 'Management of').replace('Esportivos', 'Sports');
    description = description.replace('Plataforma completa', 'Complete platform').replace('gestão de atletas', 'athlete management');
  } else if (locale === 'es-ES') {
    title = title.replace('Gestão de', 'Gestión de').replace('Esportivos', 'Deportivos');
    description = description.replace('Plataforma completa', 'Plataforma completa').replace('gestão de atletas', 'gestión de atletas');
  }

  return {
    ...defaultMetadata,
    title: title,
    description: description,
    keywords: page.keywords.join(', '),
    openGraph: {
      title: title,
      description: description,
      url: `https://dgsports.com${locale !== 'pt-BR' ? '/' + locale.split('-')[0].toLowerCase() : ''}${path}`,
      siteName: 'DG Sports Management',
      images: [
        {
          url: page.image || '/LOGODG.svg',
          width: 800,
          height: 600,
          alt: 'DG Sports Management',
        },
      ],
      locale: locale.replace('-', '_'),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [page.image || '/LOGODG.svg'],
      creator: '@dgsports',
    },
    alternates: {
      canonical: `https://dgsports.com${path}`,
      languages: {
        'pt-BR': `https://dgsports.com${path}`,
        'en-US': `https://dgsports.com/en${path}`,
        'es-ES': `https://dgsports.com/es${path}`,
      },
    },
  };
}