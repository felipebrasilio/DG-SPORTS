import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { toast } from "@/components/ui/toast";

interface FinancaFormData {
  data: string;
  tipo: string;
  valor: number;
  moeda: string;
  descricao: string;
  status: string;
  comprovante: string;
}

export function FinancaForm({ atletaId }: { atletaId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FinancaFormData>();

  const onSubmit = async (data: FinancaFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/financas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, atletaId }),
      });

      if (!response.ok) {
        throw new Error('Erro ao registrar finança');
      }

      toast({
        title: "Sucesso!",
        description: "Registro financeiro criado com sucesso.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Erro!",
        description: "Erro ao registrar finança. Tente novamente.",
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
          <Label htmlFor="data">Data</Label>
          <Input
            id="data"
            type="date"
            {...register("data", { required: "Data é obrigatória" })}
            error={errors.data?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tipo">Tipo</Label>
          <Select
            id="tipo"
            {...register("tipo", { required: "Tipo é obrigatório" })}
          >
            <option value="">Selecione o tipo</option>
            <option value="receita">Receita</option>
            <option value="despesa">Despesa</option>
            <option value="salario">Salário</option>
            <option value="bonus">Bônus</option>
            <option value="comissao">Comissão</option>
            <option value="imposto">Imposto</option>
            <option value="outro">Outro</option>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="valor">Valor</Label>
          <Input
            id="valor"
            type="number"
            step="0.01"
            {...register("valor", {
              required: "Valor é obrigatório",
              min: { value: 0, message: "Valor deve ser maior que zero" },
            })}
            error={errors.valor?.message}
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

        <div className="col-span-2 space-y-2">
          <Label htmlFor="descricao">Descrição</Label>
          <textarea
            id="descricao"
            className="w-full h-24 px-3 py-2 border rounded-md"
            {...register("descricao")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            id="status"
            {...register("status", { required: "Status é obrigatório" })}
          >
            <option value="pendente">Pendente</option>
            <option value="pago">Pago</option>
            <option value="cancelado">Cancelado</option>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="comprovante">Comprovante</Label>
          <Input
            id="comprovante"
            type="file"
            {...register("comprovante")}
            error={errors.comprovante?.message}
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