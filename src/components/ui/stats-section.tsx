import { cn } from '@/lib/utils';

type StatItemProps = {
  value: string;
  label: string;
  icon: React.ReactNode;
  color: string;
};

const StatItem = ({ value, label, icon, color }: StatItemProps) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mb-4", color)}>
        {icon}
      </div>
      <h3 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-900 to-amber-500 bg-clip-text text-transparent">
        {value}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-center">{label}</p>
    </div>
  );
};

export function StatsSection() {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            DG Sports em Números
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Resultados que comprovam nossa excelência na gestão de carreiras esportivas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatItem
            value="150+"
            label="Atletas Gerenciados"
            icon={
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
            color="bg-blue-900"
          />
          <StatItem
            value="45+"
            label="Clubes Parceiros"
            icon={
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
            color="bg-amber-500"
          />
          <StatItem
            value="200+"
            label="Contratos Intermediados"
            icon={
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
            color="bg-blue-700"
          />
          <StatItem
            value="98%"
            label="Índice de Satisfação"
            icon={
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            }
            color="bg-green-600"
          />
        </div>
      </div>
    </section>
  );
}