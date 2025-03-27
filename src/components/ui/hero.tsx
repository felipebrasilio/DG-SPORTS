'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type HeroSlide = {
  title: string;
  subtitle: string;
  image: string;
  cta: {
    text: string;
    href: string;
  };
};

const slides: HeroSlide[] = [
  {
    title: 'Gestão de Carreira para Atletas Profissionais',
    subtitle: 'Transformando talentos em carreiras de sucesso com estratégia e dedicação',
    image: '/images/atletas-banner.svg',
    cta: {
      text: 'Conheça Nossos Serviços',
      href: '/servicos',
    },
  },
  {
    title: 'Análise de Desempenho Avançada',
    subtitle: 'Utilizamos tecnologia de ponta para maximizar seu potencial esportivo',
    image: '/images/desempenho-banner.svg',
    cta: {
      text: 'Ver Análises',
      href: '/servicos/analise-desempenho',
    },
  },
  {
    title: 'Intermediação com Clubes Nacionais e Internacionais',
    subtitle: 'Conectamos atletas e clubes para parcerias de sucesso',
    image: '/images/contratos-banner.svg',
    cta: {
      text: 'Saiba Mais',
      href: '/servicos/intermediacao',
    },
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000',
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-black/50 z-10" />
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            className="object-cover object-center"
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4 md:px-8 lg:px-16">
        <div className="container mx-auto max-w-5xl">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={cn(
                'transition-all duration-700 transform',
                currentSlide === index
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8 absolute'
              )}
            >
              {currentSlide === index && (
                <>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight bg-gradient-to-r from-white to-amber-300 bg-clip-text text-transparent">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl text-gray-200">
                    {slide.subtitle}
                  </p>
                  <Link
                    href={slide.cta.href}
                    className="inline-block bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105"
                  >
                    {slide.cta.text}
                  </Link>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-300',
                currentSlide === index
                  ? 'bg-amber-500 w-10'
                  : 'bg-white/50 hover:bg-white/80'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}