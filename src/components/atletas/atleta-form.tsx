import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { toast } from "@/components/ui/toast";

interface AtletaFormData {
  nome: string;
  dataNascimento: string;
  nacionalidade: string;
  posicao: string;
  altura: number;
  peso: number;
  email: string;
  telefone: string;
  cpf: string;
  rg: string;
  passaporte: string;
  endereco: string;
  cidade: string;
  estado: string;
  pais: string;
  cep: string;
  observacoes: string;
}

export function AtletaForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<AtletaFormData>();

  const onSubmit = async (data: AtletaFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/atletas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar atleta');
      }

      toast({
        title: "Sucesso!",
        description: "Atleta cadastrado com sucesso.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Erro!",
        description: "Erro ao cadastrar atleta. Tente novamente.",
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
          <Label htmlFor="nome">Nome Completo</Label>
          <Input
            id="nome"
            {...register("nome", { required: "Nome é obrigatório" })}
            error={errors.nome?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataNascimento">Data de Nascimento</Label>
          <Input
            id="dataNascimento"
            type="date"
            {...register("dataNascimento", { required: "Data de nascimento é obrigatória" })}
            error={errors.dataNascimento?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nacionalidade">Nacionalidade</Label>
          <Input
            id="nacionalidade"
            {...register("nacionalidade", { required: "Nacionalidade é obrigatória" })}
            error={errors.nacionalidade?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="posicao">Posição</Label>
          <Select
            id="posicao"
            {...register("posicao")}
          >
            <option value="">Selecione uma posição</option>
            <option value="atacante">Atacante</option>
            <option value="meio-campo">Meio-Campo</option>
            <option value="defensor">Defensor</option>
            <option value="goleiro">Goleiro</option>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="altura">Altura (m)</Label>
          <Input
            id="altura"
            type="number"
            step="0.01"
            {...register("altura", { min: 0 })}
            error={errors.altura?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="peso">Peso (kg)</Label>
          <Input
            id="peso"
            type="number"
            step="0.1"
            {...register("peso", { min: 0 })}
            error={errors.peso?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "E-mail é obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "E-mail inválido",
              },
            })}
            error={errors.email?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            {...register("telefone")}
            error={errors.telefone?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            {...register("cpf", { required: "CPF é obrigatório" })}
            error={errors.cpf?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rg">RG</Label>
          <Input
            id="rg"
            {...register("rg")}
            error={errors.rg?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="passaporte">Passaporte</Label>
          <Input
            id="passaporte"
            {...register("passaporte")}
            error={errors.passaporte?.message}
          />
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="endereco">Endereço</Label>
          <Input
            id="endereco"
            {...register("endereco")}
            error={errors.endereco?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cidade">Cidade</Label>
          <Input
            id="cidade"
            {...register("cidade")}
            error={errors.cidade?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="estado">Estado</Label>
          <Input
            id="estado"
            {...register("estado")}
            error={errors.estado?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pais">País</Label>
          <Input
            id="pais"
            {...register("pais")}
            error={errors.pais?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cep">CEP</Label>
          <Input
            id="cep"
            {...register("cep")}
            error={errors.cep?.message}
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