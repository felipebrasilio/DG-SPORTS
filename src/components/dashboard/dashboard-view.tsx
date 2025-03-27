import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartPie, Users, FileContract, DollarSign, TrendingUp } from "lucide-react";

interface DashboardStats {
  totalAtletas: number;
  atletasAtivos: number;
  contratosAtivos: number;
  receitaTotal: number;
  despesaTotal: number;
  avaliacoesRecentes: number;
}

export function DashboardView() {
  const [stats, setStats] = useState<DashboardStats>({
    totalAtletas: 0,
    atletasAtivos: 0,
    contratosAtivos: 0,
    receitaTotal: 0,
    despesaTotal: 0,
    avaliacoesRecentes: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total de Atletas</p>
              <h2 className="text-3xl font-bold">{stats.totalAtletas}</h2>
              <p className="text-sm text-gray-500 mt-2">
                {stats.atletasAtivos} atletas ativos
              </p>
            </div>
            <Users className="h-12 w-12 text-primary" />
          </div>
          <Button variant="link" className="mt-4 w-full">
            Ver Atletas
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Contratos Ativos</p>
              <h2 className="text-3xl font-bold">{stats.contratosAtivos}</h2>
              <p className="text-sm text-gray-500 mt-2">
                Gerenciamento de contratos
              </p>
            </div>
            <FileContract className="h-12 w-12 text-primary" />
          </div>
          <Button variant="link" className="mt-4 w-full">
            Ver Contratos
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Balanço Financeiro</p>
              <h2 className="text-3xl font-bold">
                R$ {(stats.receitaTotal - stats.despesaTotal).toLocaleString()}
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Receitas vs Despesas
              </p>
            </div>
            <DollarSign className="h-12 w-12 text-primary" />
          </div>
          <Button variant="link" className="mt-4 w-full">
            Ver Finanças
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avaliações Recentes</p>
              <h2 className="text-3xl font-bold">{stats.avaliacoesRecentes}</h2>
              <p className="text-sm text-gray-500 mt-2">
                Últimos 30 dias
              </p>
            </div>
            <TrendingUp className="h-12 w-12 text-primary" />
          </div>
          <Button variant="link" className="mt-4 w-full">
            Ver Desempenho
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Análise Geral</p>
              <h2 className="text-xl font-bold mt-2">Relatórios e Métricas</h2>
              <p className="text-sm text-gray-500 mt-2">
                Visualize dados consolidados
              </p>
            </div>
            <ChartPie className="h-12 w-12 text-primary" />
          </div>
          <Button variant="link" className="mt-4 w-full">
            Ver Relatórios
          </Button>
        </Card>
      </div>
    </div>
  );
}