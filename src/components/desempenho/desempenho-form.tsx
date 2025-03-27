import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { toast } from "@/components/ui/toast";

interface DesempenhoFormData {
  data: string;
  tipo: string;
  valor: number;
  unidade: string;
  observacoes: string;
}

export function DesempenhoForm({ atletaId }: { atletaId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<DesempenhoFormData>();

  const onSubmit = async (data: DesempenhoFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/desempenhos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, atletaId }),
      });

      if (!response.ok) {
        throw new Error('Erro ao registrar desempenho');
      }

      toast({
        title: "Sucesso!",
        description: "Desempenho registrado com sucesso.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Erro!",
        description: "Erro ao registrar desempenho. Tente novamente.",
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
          <Label htmlFor="tipo">Tipo de Avaliação</Label>
          <Select
            id="tipo"
            {...register("tipo", { required: "Tipo de avaliação é obrigatório" })}
          >
            <option value="">Selecione o tipo</option>
            <option value="velocidade">Velocidade</option>
            <option value="resistencia">Resistência</option>
            <option value="forca">Força</option>
            <option value="agilidade">Agilidade</option>
            <option value="tecnica">Técnica</option>
            <option value="tatico">Tático</option>
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
          <Label htmlFor="unidade">Unidade de Medida</Label>
          <Select
            id="unidade"
            {...register("unidade", { required: "Unidade é obrigatória" })}
          >
            <option value="">Selecione a unidade</option>
            <option value="km/h">km/h</option>
            <option value="m/s">m/s</option>
            <option value="kg">kg</option>
            <option value="m">metros</option>
            <option value="s">segundos</option>
            <option value="min">minutos</option>
            <option value="pontos">pontos</option>
          </Select>
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="observacoes">Observações</Label>
          <textarea
            id="observacoes"
            className="w-full h-24 px-3 py-2 border rounded-md"
            {...register("observacoes")}
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