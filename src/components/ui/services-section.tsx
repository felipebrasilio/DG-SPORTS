import Image from 'next/image';
import Link from 'next/link';

type ServiceCardProps = {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
};

const ServiceCard = ({ title, description, icon, href, color }: ServiceCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      <div className={`h-2 ${color}`} />
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color.replace('bg-', 'bg-opacity-10 text-')}`}>
            <Image src={icon} alt={title} width={28} height={28} />
          </div>
          <h3 className="text-xl font-bold ml-4 text-gray-800 dark:text-white group-hover:text-blue-900 dark:group-hover:text-amber-500 transition-colors duration-300">
            {title}
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
        <Link 
          href={href}
          className="inline-flex items-center text-blue-900 dark:text-amber-500 font-medium group-hover:translate-x-1 transition-transform duration-300"
        >
          Saiba mais
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export function ServicesSection() {
  const services = [
    {
      title: 'Gestão de Carreira',
      description: 'Acompanhamento profissional completo para atletas, incluindo planejamento estratégico e gestão de contratos.',
      icon: '/images/contratos-banner.svg',
      href: '/servicos/gestao-carreira',
      color: 'bg-blue-900',
    },
    {
      title: 'Análise de Desempenho',
      description: 'Utilizamos tecnologia avançada e IA para analisar e melhorar o desempenho técnico e físico dos atletas.',
      icon: '/images/desempenho-banner.svg',
      href: '/servicos/analise-desempenho',
      color: 'bg-amber-500',
    },
    {
      title: 'Intermediação com Clubes',
      description: 'Negociação de contratos com times nacionais e internacionais, garantindo as melhores oportunidades.',
      icon: '/images/relatorios-banner.svg',
      href: '/servicos/intermediacao',
      color: 'bg-blue-700',
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Nossos Serviços
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Oferecemos soluções completas para o desenvolvimento e gestão da carreira de atletas profissionais
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/servicos"
            className="inline-flex items-center bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-md shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            Ver Todos os Serviços
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}