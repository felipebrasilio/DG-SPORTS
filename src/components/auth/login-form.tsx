import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";

interface LoginFormData {
  email: string;
  senha: string;
}

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.senha,
      });

      if (result?.error) {
        throw new Error('Credenciais inválidas');
      }

      toast({
        title: "Sucesso!",
        description: "Login realizado com sucesso.",
        variant: "success",
      });

      router.push('/dashboard');
    } catch (error) {
      toast({
        title: "Erro!",
        description: "E-mail ou senha inválidos. Tente novamente.",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">DG Sports Management</h1>
        <p className="text-gray-500 mt-2">Faça login para acessar o sistema</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </div>
  );
}