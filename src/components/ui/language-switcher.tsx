'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Locale, i18n } from '@/lib/i18n-config';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState<Locale>('pt-BR');

  useEffect(() => {
    // Determinar o idioma atual com base no caminho
    if (pathname.startsWith('/en')) {
      setCurrentLocale('en-US');
    } else if (pathname.startsWith('/es')) {
      setCurrentLocale('es-ES');
    } else {
      setCurrentLocale('pt-BR');
    }
  }, [pathname]);

  const handleLanguageChange = (locale: Locale) => {
    // Redirecionar para a versão correta do site
    let newPath = pathname;
    
    // Remover prefixos de idioma existentes
    if (newPath.startsWith('/en') || newPath.startsWith('/es')) {
      newPath = newPath.substring(3);
    }
    
    // Se não houver barra no início após remover o prefixo, adicionar
    if (!newPath.startsWith('/')) {
      newPath = '/' + newPath;
    }
    
    // Se for a página inicial e o idioma não for o padrão, adicionar prefixo
    if (locale === 'en-US') {
      router.push('/en' + newPath);
    } else if (locale === 'es-ES') {
      router.push('/es' + newPath);
    } else {
      router.push(newPath);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleLanguageChange('pt-BR')}
        className={`text-sm px-2 py-1 rounded ${currentLocale === 'pt-BR' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        aria-label="Mudar para Português"
      >
        PT
      </button>
      <button
        onClick={() => handleLanguageChange('en-US')}
        className={`text-sm px-2 py-1 rounded ${currentLocale === 'en-US' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        aria-label="Change to English"
      >
        EN
      </button>
      <button
        onClick={() => handleLanguageChange('es-ES')}
        className={`text-sm px-2 py-1 rounded ${currentLocale === 'es-ES' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
    </div>
  );
}