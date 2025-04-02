'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './language-switcher';

type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

const navItems: NavItem[] = [
  { label: 'Início', href: '/' },
  { label: 'Sobre Nós', href: '/sobre' },
  {
    label: 'Serviços',
    href: '/servicos',
    children: [
      { label: 'Gestão de Carreira', href: '/servicos/gestao-carreira' },
      { label: 'Análise de Desempenho', href: '/servicos/analise-desempenho' },
      { label: 'Intermediação com Clubes', href: '/servicos/intermediacao' },
    ],
  },
  { label: 'Atletas', href: '/atletas' },
  { label: 'Clubes', href: '/clubes' },
  { label: 'Contato', href: '/contato' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-2'
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/LOGODG.svg"
            alt="DG Sports Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-900 to-amber-500 bg-clip-text text-transparent">
            DG Sports
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              {item.children ? (
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className="flex items-center text-gray-700 dark:text-gray-200 hover:text-blue-900 dark:hover:text-amber-500 font-medium"
                >
                  {item.label}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-900 dark:hover:text-amber-500 font-medium"
                >
                  {item.label}
                </Link>
              )}

              {item.children && (
                <div
                  className={cn(
                    'absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 transition-all duration-200 transform origin-top-right',
                    activeDropdown === item.label
                      ? 'scale-100 opacity-100'
                      : 'scale-95 opacity-0 pointer-events-none'
                  )}
                >
                  <div className="py-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Login/Register Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <LanguageSwitcher />
          <Link
            href="/login"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-900 dark:hover:text-amber-500 font-medium"
          >
            Login
          </Link>
          <Link
            href="/cadastro"
            className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300"
          >
            Cadastre-se
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-700 dark:text-gray-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 z-40 bg-white dark:bg-gray-900 transition-transform duration-300 ease-in-out transform',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full p-4 pt-20">
          {navItems.map((item) => (
            <div key={item.label} className="py-2">
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="flex items-center justify-between w-full text-gray-700 dark:text-gray-200 hover:text-blue-900 dark:hover:text-amber-500 font-medium py-2"
                  >
                    {item.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={cn(
                        'h-4 w-4 transition-transform duration-200',
                        activeDropdown === item.label ? 'rotate-180' : ''
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div
                    className={cn(
                      'pl-4 mt-1 space-y-1 overflow-hidden transition-all duration-200',
                      activeDropdown === item.label
                        ? 'max-h-40 opacity-100'
                        : 'max-h-0 opacity-0'
                    )}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block py-2 text-gray-600 dark:text-gray-400 hover:text-blue-900 dark:hover:text-amber-500"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className="block text-gray-700 dark:text-gray-200 hover:text-blue-900 dark:hover:text-amber-500 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          <div className="mt-auto flex flex-col space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/login"
              className="text-center text-gray-700 dark:text-gray-200 hover:text-blue-900 dark:hover:text-amber-500 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/cadastro"
              className="text-center bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white py-3 rounded-md font-medium transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}