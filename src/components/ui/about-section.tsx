'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
};

type Testimonial = {
  name: string;
  role: string;
  image: string;
  content: string;
  club?: string;
};

const teamMembers: TeamMember[] = [
  {
    name: 'Daniel Gomes',
    role: 'Fundador & CEO',
    image: '/images/team/daniel.svg',
    bio: 'Ex-jogador profissional com mais de 15 anos de experiência no mercado esportivo.',
  },
  {
    name: 'Ana Silva',
    role: 'Diretora de Análise de Desempenho',
    image: '/images/team/ana.svg',
    bio: 'Especialista em análise de dados esportivos e inteligência artificial aplicada ao futebol.',
  },
  {
    name: 'Carlos Santos',
    role: 'Diretor de Relações Internacionais',
    image: '/images/team/carlos.svg',
    bio: 'Experiência global em negociações com clubes da Europa e América do Sul.',
  },
];

const testimonials: Testimonial[] = [
  {
    name: 'Pedro Alves',
    role: 'Atleta Profissional',
    image: '/images/testimonials/pedro.svg',
    content: 'A DG Sports transformou minha carreira. O suporte profissional e a análise de desempenho foram fundamentais para minha evolução.',
    club: 'FC Porto',
  },
  {
    name: 'Maria Costa',
    role: 'Diretora Esportiva',
    image: '/images/testimonials/maria.svg',
    content: 'Parceria excepcional. A seriedade e profissionalismo da equipe facilitam muito nossas negociações.',
    club: 'Santos FC',
  },
];

const TeamMemberCard = ({ name, role, image, bio }: TeamMember) => (
  <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
    <div className="aspect-square relative">
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{name}</h3>
      <p className="text-amber-500 font-semibold mb-3">{role}</p>
      <p className="text-gray-600 dark:text-gray-300">{bio}</p>
    </div>
  </div>
);

const TestimonialCard = ({ name, role, image, content, club }: Testimonial) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 relative">
    <div className="flex items-center mb-4">
      <div className="w-16 h-16 relative rounded-full overflow-hidden mr-4">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h4 className="text-lg font-bold text-gray-900 dark:text-white">{name}</h4>
        <p className="text-amber-500">{role}</p>
        {club && <p className="text-gray-600 dark:text-gray-400 text-sm">{club}</p>}
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-300 italic">"{content}"</p>
  </div>
);

export function AboutSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* História e Missão */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Nossa História
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Desde 2015, a DG Sports Management tem se dedicado a transformar talentos em carreiras de sucesso,
            combinando experiência no mercado esportivo com tecnologia de ponta.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-3">Nossa Missão</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Desenvolver e impulsionar carreiras esportivas com excelência e inovação.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-3">Nossa Visão</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ser referência global em gestão de carreiras esportivas e desenvolvimento de atletas.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-3">Nossos Valores</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ética, inovação, excelência e compromisso com o sucesso dos nossos atletas.
              </p>
            </div>
          </div>
        </div>

        {/* Equipe */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white text-center">
            Nossa Equipe
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center mb-12">
            Profissionais experientes dedicados ao sucesso dos nossos atletas
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.name} {...member} />
            ))}
          </div>
        </div>

        {/* Depoimentos */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white text-center">
            O Que Dizem Sobre Nós
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center mb-12">
            A opinião de quem confia em nosso trabalho
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}