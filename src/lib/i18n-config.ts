export type Locale = 'pt-BR' | 'en-US' | 'es-ES';

export const i18n = {
  defaultLocale: 'pt-BR' as const,
  locales: ['pt-BR', 'en-US', 'es-ES'] as const,
};

export type LocaleMessages = {
  [key: string]: string;
};

export const messages: Record<Locale, LocaleMessages> = {
  'pt-BR': {
    home: 'Início',
    about: 'Sobre Nós',
    services: 'Serviços',
    athletes: 'Atletas',
    clubs: 'Clubes',
    contact: 'Contato',
    careerManagement: 'Gestão de Carreira',
    performanceAnalysis: 'Análise de Desempenho',
    clubIntermediation: 'Intermediação com Clubes',
    welcome: 'Bem-vindo à DG Sports Management',
    platformDescription: 'Plataforma completa para gestão de atletas, contratos, finanças e análise de desempenho esportivo.',
    athletesManagement: 'Gerenciamento completo para atletas profissionais.',
    contractsManagement: 'Gestão de contratos e negociações esportivas.',
    performanceManagement: 'Análise de desempenho e estatísticas esportivas.',
    financialManagement: 'Controle financeiro para atletas e clubes.',
    reportsManagement: 'Relatórios e análises estratégicas.',
  },
  'en-US': {
    home: 'Home',
    about: 'About Us',
    services: 'Services',
    athletes: 'Athletes',
    clubs: 'Clubs',
    contact: 'Contact',
    careerManagement: 'Career Management',
    performanceAnalysis: 'Performance Analysis',
    clubIntermediation: 'Club Intermediation',
    welcome: 'Welcome to DG Sports Management',
    platformDescription: 'Complete platform for athlete management, contracts, finances and sports performance analysis.',
    athletesManagement: 'Complete management for professional athletes.',
    contractsManagement: 'Management of contracts and sports negotiations.',
    performanceManagement: 'Performance analysis and sports statistics.',
    financialManagement: 'Financial control for athletes and clubs.',
    reportsManagement: 'Reports and strategic analysis.',
  },
  'es-ES': {
    home: 'Inicio',
    about: 'Sobre Nosotros',
    services: 'Servicios',
    athletes: 'Atletas',
    clubs: 'Clubes',
    contact: 'Contacto',
    careerManagement: 'Gestión de Carrera',
    performanceAnalysis: 'Análisis de Rendimiento',
    clubIntermediation: 'Intermediación con Clubes',
    welcome: 'Bienvenido a DG Sports Management',
    platformDescription: 'Plataforma completa para la gestión de atletas, contratos, finanzas y análisis de rendimiento deportivo.',
    athletesManagement: 'Gestión completa para atletas profesionales.',
    contractsManagement: 'Gestión de contratos y negociaciones deportivas.',
    performanceManagement: 'Análisis de rendimiento y estadísticas deportivas.',
    financialManagement: 'Control financiero para atletas y clubes.',
    reportsManagement: 'Informes y análisis estratégicos.',
  },
};

export function getMessages(locale: Locale) {
  return messages[locale];
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/');
  const localeSegment = segments[1];
  
  if (localeSegment === 'en') return 'en-US';
  if (localeSegment === 'es') return 'es-ES';
  
  return 'pt-BR';
}