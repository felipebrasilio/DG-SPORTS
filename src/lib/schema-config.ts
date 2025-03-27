import { Organization, Person, SportsTeam, Article } from 'schema-dts';

type SchemaType = Organization | Person | SportsTeam | Article;

const defaultSchema: Organization = {
  '@type': 'Organization',
  '@context': 'https://schema.org',
  name: 'DG Sports Management',
  description: 'Plataforma completa para gestão de atletas e contratos esportivos',
  url: 'https://dgsports.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://dgsports.com/LOGODG.jpg'
  },
  sameAs: [
    'https://twitter.com/dgsports',
    'https://facebook.com/dgsports',
    'https://instagram.com/dgsports'
  ]
};

const pageSchemas: Record<string, SchemaType> = {
  atletas: {
    '@type': 'Person',
    '@context': 'https://schema.org',
    name: 'Atleta',
    description: 'Perfil e gestão de carreira de atletas profissionais',
    image: '/images/atletas-banner.svg',
    jobTitle: 'Atleta Profissional'
  },
  contratos: {
    '@type': 'Article',
    '@context': 'https://schema.org',
    headline: 'Contratos Esportivos',
    description: 'Gestão e documentação de contratos esportivos',
    image: '/images/contratos-banner.svg',
    articleSection: 'Contratos'
  },
  financas: {
    '@type': 'Article',
    '@context': 'https://schema.org',
    headline: 'Gestão Financeira Esportiva',
    description: 'Controle financeiro para atletas e organizações',
    image: '/images/financas-banner.svg',
    articleSection: 'Finanças'
  },
  desempenho: {
    '@type': 'Article',
    '@context': 'https://schema.org',
    headline: 'Análise de Desempenho Esportivo',
    description: 'Métricas e análises de desempenho esportivo',
    image: '/images/desempenho-banner.svg',
    articleSection: 'Desempenho'
  },
  relatorios: {
    '@type': 'Article',
    '@context': 'https://schema.org',
    headline: 'Relatórios Esportivos',
    description: 'Relatórios e insights estratégicos',
    image: '/images/relatorios-banner.svg',
    articleSection: 'Relatórios'
  }
};

export function generateSchema(path: string): string {
  const page = path.split('/')[1] || 'home';
  const schema = pageSchemas[page] || defaultSchema;
  
  return `<script type=\"application/ld+json\">${JSON.stringify(schema)}</script>`;
}