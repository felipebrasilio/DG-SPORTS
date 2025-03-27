import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { toast } from "@/components/ui/toast";

interface UsuarioFormData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  role: string;
}

export function UsuarioForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<UsuarioFormData>();
  const senha = watch('senha');

  const onSubmit = async (data: UsuarioFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar usuário');
      }

      toast({
        title: "Sucesso!",
        description: "Usuário cadastrado com sucesso.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Erro!",
        description: "Erro ao cadastrar usuário. Tente novamente.",
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
          <Label htmlFor="senha">Senha</Label>
          <Input
            id="senha"
            type="password"
            {...register("senha", {
              required: "Senha é obrigatória",
              minLength: {
                value: 8,
                message: "A senha deve ter no mínimo 8 caracteres",
              },
            })}
            error={errors.senha?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
          <Input
            id="confirmarSenha"
            type="password"
            {...register("confirmarSenha", {
              required: "Confirmação de senha é obrigatória",
              validate: value =>
                value === senha || "As senhas não coincidem",
            })}
            error={errors.confirmarSenha?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Nível de Acesso</Label>
          <Select
            id="role"
            {...register("role", { required: "Nível de acesso é obrigatório" })}
          >
            <option value="">Selecione o nível</option>
            <option value="admin">Administrador</option>
            <option value="manager">Gerente</option>
            <option value="user">Usuário</option>
          </Select>
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