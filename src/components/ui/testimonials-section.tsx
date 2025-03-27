import Image from 'next/image';
import { cn } from '@/lib/utils';

type Testimonial = {
  content: string;
  author: string;
  role: string;
  image: string;
  rating?: number;
};

const testimonials: Testimonial[] = [
  {
    content: 'A DG Sports transformou minha carreira. Com sua gestão profissional, consegui me concentrar apenas no meu desempenho em campo, enquanto eles cuidavam de todos os aspectos contratuais e financeiros.',
    author: 'Carlos Silva',
    role: 'Atacante Profissional',
    image: '/images/atletas-banner.svg',
    rating: 5,
  },
  {
    content: 'A análise de desempenho da DG Sports nos ajudou a identificar talentos que se encaixam perfeitamente no estilo de jogo do nosso clube. Uma parceria que tem gerado excelentes resultados.',
    author: 'Clube Atlético Nacional',
    role: 'Departamento de Recrutamento',
    image: '/images/contratos-banner.svg',
    rating: 5,
  },
  {
    content: 'Desde que comecei a trabalhar com a DG Sports, minha visibilidade no mercado internacional aumentou significativamente. Hoje tenho propostas de clubes que antes pareciam inalcançáveis.',
    author: 'Fernanda Oliveira',
    role: 'Meio-campista',
    image: '/images/desempenho-banner.svg',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            O Que Dizem Sobre Nós
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Conheça a experiência de atletas e clubes que confiam na DG Sports Management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.author}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              
              {testimonial.rating && (
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={cn(
                        "w-5 h-5",
                        i < testimonial.rating! 
                          ? "text-amber-500" 
                          : "text-gray-300 dark:text-gray-600"
                      )}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}
              
              <p className="text-gray-700 dark:text-gray-300 italic mb-4">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}