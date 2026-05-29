"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/store";
import {
  Users,
  UserPlus,
  LogOut,
  Activity,
  LayoutDashboard,
} from "lucide-react";

export default function GestaoClinica() {
  const { token, login, logout } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [funcionarios, setFuncionarios] = useState([]);
  const [erroLogin, setErroLogin] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/funcionarios/")
      .then((res) => res.json())
      .then((data) => setFuncionarios(data))
      .catch((err) => console.error("Erro na API:", err));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const res = await fetch("http://localhost:8000/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      login(data.access_token);
      setErroLogin("");
    } else {
      setErroLogin("Credenciais inválidas");
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-sm border border-slate-100 p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-blue-600 p-3 rounded-xl">
              <Activity className="text-white h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold ml-3 text-slate-800">FESF-SUS</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Usuário
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Senha
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {erroLogin && (
              <p className="text-red-500 text-sm font-medium">{erroLogin}</p>
            )}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors mt-2">
              Entrar no Sistema
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Activity className="text-blue-600 h-6 w-6" />
          <span className="text-lg font-bold ml-2 text-slate-800">
            Clínica FESF
          </span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <button className="w-full flex items-center px-3 py-2 text-blue-600 bg-blue-50 rounded-lg font-medium transition-colors">
            <LayoutDashboard className="h-5 w-5 mr-3" />
            Visão Geral
          </button>
          <button className="w-full flex items-center px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors">
            <Users className="h-5 w-5 mr-3" />
            Funcionários
          </button>
          <button className="w-full flex items-center px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors">
            <UserPlus className="h-5 w-5 mr-3" />
            Pacientes
          </button>
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={logout}
            className="w-full flex items-center px-3 py-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sair
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">
            Gestão de Funcionários
          </h2>
          <p className="text-slate-500">
            Acompanhe os colaboradores cadastrados na clínica.
          </p>
        </header>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-semibold text-slate-800">Equipe Ativa</h3>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              + Novo Cadastro
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-sm text-slate-500 uppercase tracking-wider">
                  <th className="p-4 font-medium">ID</th>
                  <th className="p-4 font-medium">Nome</th>
                  <th className="p-4 font-medium">Cargo</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {funcionarios.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500">
                      Nenhum funcionário cadastrado.
                    </td>
                  </tr>
                ) : (
                  funcionarios.map((f: any) => (
                    <tr
                      key={f.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="p-4 text-slate-600">#{f.id}</td>
                      <td className="p-4 font-medium text-slate-800">
                        {f.nome}
                      </td>
                      <td className="p-4 text-slate-600">{f.cargo}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            f.ativo
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {f.ativo ? "Ativo" : "Inativo"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
