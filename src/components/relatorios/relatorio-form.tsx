import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { toast } from "@/components/ui/toast";

interface RelatorioFormData {
  tipo: string;
  dataInicio: string;
  dataFim: string;
  atletaId?: string;
  formato: string;
  filtros: {
    status?: string;
    clube?: string;
    tipoContrato?: string;
    tipoFinanca?: string;
    tipoDesempenho?: string;
  };
}

export function RelatorioForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RelatorioFormData>();
  const tipoRelatorio = watch('tipo');

  const onSubmit = async (data: RelatorioFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/relatorios/gerar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar relatório');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio-${data.tipo}-${new Date().toISOString()}.${data.formato}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      toast({
        title: "Sucesso!",
        description: "Relatório gerado com sucesso.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Erro!",
        description: "Erro ao gerar relatório. Tente novamente.",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tipo">Tipo de Relatório</Label>
          <Select
            id="tipo"
            {...register("tipo", { required: "Tipo de relatório é obrigatório" })}
          >
            <option value="">Selecione o tipo</option>
            <option value="atletas">Atletas</option>
            <option value="contratos">Contratos</option>
            <option value="financeiro">Financeiro</option>
            <option value="desempenho">Desempenho</option>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="formato">Formato do Relatório</Label>
          <Select
            id="formato"
            {...register("formato", { required: "Formato é obrigatório" })}
          >
            <option value="pdf">PDF</option>
            <option value="xlsx">Excel</option>
            <option value="csv">CSV</option>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataInicio">Data Inicial</Label>
          <Input
            id="dataInicio"
            type="date"
            {...register("dataInicio", { required: "Data inicial é obrigatória" })}
            error={errors.dataInicio?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataFim">Data Final</Label>
          <Input
            id="dataFim"
            type="date"
            {...register("dataFim", { required: "Data final é obrigatória" })}
            error={errors.dataFim?.message}
          />
        </div>

        {tipoRelatorio === 'atletas' && (
          <div className="space-y-2">
            <Label htmlFor="status">Status do Atleta</Label>
            <Select
              id="status"
              {...register("filtros.status")}
            >
              <option value="">Todos</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
              <option value="suspenso">Suspenso</option>
            </Select>
          </div>
        )}

        {tipoRelatorio === 'contratos' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="clube">Clube</Label>
              <Input
                id="clube"
                {...register("filtros.clube")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipoContrato">Tipo de Contrato</Label>
              <Select
                id="tipoContrato"
                {...register("filtros.tipoContrato")}
              >
                <option value="">Todos</option>
                <option value="profissional">Profissional</option>
                <option value="formacao">Formação</option>
                <option value="emprestimo">Empréstimo</option>
                <option value="imagem">Direitos de Imagem</option>
              </Select>
            </div>
          </>
        )}

        {tipoRelatorio === 'financeiro' && (
          <div className="space-y-2">
            <Label htmlFor="tipoFinanca">Tipo de Movimentação</Label>
            <Select
              id="tipoFinanca"
              {...register("filtros.tipoFinanca")}
            >
              <option value="">Todos</option>
              <option value="receita">Receita</option>
              <option value="despesa">Despesa</option>
              <option value="salario">Salário</option>
              <option value="bonus">Bônus</option>
              <option value="comissao">Comissão</option>
              <option value="imposto">Imposto</option>
            </Select>
          </div>
        )}

        {tipoRelatorio === 'desempenho' && (
          <div className="space-y-2">
            <Label htmlFor="tipoDesempenho">Tipo de Avaliação</Label>
            <Select
              id="tipoDesempenho"
              {...register("filtros.tipoDesempenho")}
            >
              <option value="">Todos</option>
              <option value="velocidade">Velocidade</option>
              <option value="resistencia">Resistência</option>
              <option value="forca">Força</option>
              <option value="agilidade">Agilidade</option>
              <option value="tecnica">Técnica</option>
              <option value="tatico">Tático</option>
            </Select>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Gerando..." : "Gerar Relatório"}
        </Button>
      </div>
    </form>
  );
}