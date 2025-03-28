import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: string;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export function UsuarioList() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const response = await fetch('/api/usuarios', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao carregar usuários');
      }

      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      toast({
        title: 'Erro!',
        description: 'Erro ao carregar usuários. Tente novamente.',
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;

    try {
      const response = await fetch(`/api/usuarios?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir usuário');
      }

      toast({
        title: 'Sucesso!',
        description: 'Usuário excluído com sucesso.',
        variant: 'success',
      });

      carregarUsuarios();
    } catch (error) {
      toast({
        title: 'Erro!',
        description: 'Erro ao excluir usuário. Tente novamente.',
        variant: 'error',
      });
    }
  };

  const handleToggleStatus = async (usuario: Usuario) => {
    try {
      const response = await fetch('/api/usuarios', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
          id: usuario.id,
          ativo: !usuario.ativo
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar status do usuário');
      }

      toast({
        title: 'Sucesso!',
        description: 'Status do usuário atualizado com sucesso.',
        variant: 'success',
      });

      carregarUsuarios();
    } catch (error) {
      toast({
        title: 'Erro!',
        description: 'Erro ao atualizar status do usuário. Tente novamente.',
        variant: 'error',
      });
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Usuários</h2>
        <Button
          onClick={() => window.location.href = '/usuarios/novo'}
          className="bg-primary text-white"
        >
          Novo Usuário
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-4 text-left">Nome</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Nível de Acesso</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id} className="border-b dark:border-gray-700">
                <td className="p-4">{usuario.nome}</td>
                <td className="p-4">{usuario.email}</td>
                <td className="p-4">{usuario.role}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded ${usuario.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                  >
                    {usuario.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => window.location.href = `/usuarios/editar/${usuario.id}`}
                      variant="outline"
                      size="sm"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => handleToggleStatus(usuario)}
                      variant="outline"
                      size="sm"
                    >
                      {usuario.ativo ? 'Desativar' : 'Ativar'}
                    </Button>
                    <Button
                      onClick={() => handleDelete(usuario.id)}
                      variant="destructive"
                      size="sm"
                    >
                      Excluir
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}