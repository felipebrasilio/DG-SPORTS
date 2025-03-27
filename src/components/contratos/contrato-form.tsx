import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { toast } from "@/components/ui/toast";

interface ContratoFormData {
  clube: string;
  dataInicio: string;
  dataFim: string;
  valorContrato: number;
  moeda: string;
  tipoContrato: string;
  clausulas: string;
  observacoes: string;
  documentos: string;
}

export function ContratoForm({ atletaId }: { atletaId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ContratoFormData>();

  const onSubmit = async (data: ContratoFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/contratos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, atletaId }),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar contrato');
      }

      toast({
        title: "Sucesso!",
        description: "Contrato cadastrado com sucesso.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Erro!",
        description: "Erro ao cadastrar contrato. Tente novamente.",
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
          <Label htmlFor="clube">Clube</Label>
          <Input
            id="clube"
            {...register("clube", { required: "Clube é obrigatório" })}
            error={errors.clube?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataInicio">Data de Início</Label>
          <Input
            id="dataInicio"
            type="date"
            {...register("dataInicio", { required: "Data de início é obrigatória" })}
            error={errors.dataInicio?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataFim">Data de Término</Label>
          <Input
            id="dataFim"
            type="date"
            {...register("dataFim", { required: "Data de término é obrigatória" })}
            error={errors.dataFim?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="valorContrato">Valor do Contrato</Label>
          <Input
            id="valorContrato"
            type="number"
            step="0.01"
            {...register("valorContrato", {
              required: "Valor do contrato é obrigatório",
              min: { value: 0, message: "Valor deve ser maior que zero" },
            })}
            error={errors.valorContrato?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="moeda">Moeda</Label>
          <Select
            id="moeda"
            {...register("moeda", { required: "Moeda é obrigatória" })}
          >
            <option value="BRL">Real (BRL)</option>
            <option value="USD">Dólar (USD)</option>
            <option value="EUR">Euro (EUR)</option>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tipoContrato">Tipo de Contrato</Label>
          <Select
            id="tipoContrato"
            {...register("tipoContrato", { required: "Tipo de contrato é obrigatório" })}
          >
            <option value="profissional">Profissional</option>
            <option value="formacao">Formação</option>
            <option value="emprestimo">Empréstimo</option>
            <option value="imagem">Direitos de Imagem</option>
          </Select>
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="clausulas">Cláusulas</Label>
          <textarea
            id="clausulas"
            className="w-full h-24 px-3 py-2 border rounded-md"
            {...register("clausulas")}
          />
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="observacoes">Observações</Label>
          <textarea
            id="observacoes"
            className="w-full h-24 px-3 py-2 border rounded-md"
            {...register("observacoes")}
          />
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="documentos">Documentos</Label>
          <Input
            id="documentos"
            type="file"
            multiple
            {...register("documentos")}
            error={errors.documentos?.message}
          />
        </div>
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
          {isLoading ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  );
}