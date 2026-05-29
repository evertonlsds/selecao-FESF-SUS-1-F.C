Sistema de Gestão Clínica e Triagem Acolhedora – FESF-SUS

Este repositório contém a solução completa para o **Item 01** e **Item 02** do Barema de Seleção. Trata-se de um sistema Fullstack moderno voltado para a gestão de equipes clínicas e triagem de pacientes com classificação de risco, separação de responsabilidades e controle de acesso baseado em papéis.

---

## 🚀 Tecnologias Utilizadas

### Backend (API)
* **FastAPI (Python):** Framework de alto desempenho focado em tipagem e rapidez de desenvolvimento.
* **Pydantic:** Modelagem e validação de dados rigorosa com schemas separados (`schemas.py`).
* **OAuth2 + Bearer Tokens:** Fluxo seguro de autenticação para proteção de endpoints.

### Frontend (Interface)
* **Next.js (TypeScript):** Framework React com renderização moderna e tipagem estática forte para prevenção de erros.
* **Zustand:** Gerenciamento de estado global leve e performático para controle de sessão do usuário.
* **Tailwind CSS:** Estilização utilitária seguindo padrões visuais limpos, minimalistas e responsivos (Design Clean/SaaS corporativo).
* **Lucide React:** Conjunto de ícones vetoriais modernos e minimalistas.

### DevOps & Infraestrutura
* **Docker & Docker Compose:** Containerização completa do ambiente de backend e banco de dados, garantindo execução idêntica em qualquer máquina.

---

## 👥 Fluxo de Funcionamento & Permissões (RBAC)

O sistema implementa uma política estrita de controle de acessos para garantir a segurança dos dados de saúde:

1.  **Administrador Master (`admin`):**
    * Possui acesso exclusivo à aba **Equipe**.
    * Responsável por cadastrar novos funcionários do sistema, registrando: *Nome Completo, Data de Nascimento, Função/Cargo, Nome de Usuário (Login)* e *Senha*.
2.  **Funcionários (Colaboradores Cadastrados):**
    * Autenticam-se utilizando os dados criados pelo Administrador.
    * Possuem acesso exclusivo à aba **Pacientes** (a aba Equipe fica oculta por segurança).
    * Responsáveis pelo registro do acolhimento e triagem, coletando: *Nome do Paciente, Data de Nascimento, Descrição Detalhada dos Sintomas* e *Classificação de Risco*.

### 🟢🔴 Classificação de Risco Visual
Ao registrar os sintomas, o profissional seleciona o nível de gravidade:
* **Nível 1 – MODERADO:** O sistema renderiza o status na tabela automaticamente com a cor **Verde**, indicando prioridade padrão.
* **Nível 2 – GRAVE / URGÊNCIA:** O sistema destaca o status na tabela automaticamente com a cor **Vermelha**, alertando para atendimento imediato.

---

## 🛠️ Como Executar o Projeto

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
* [Docker](https://www.docker.com/) e Docker Compose.
* [Node.js](https://nodejs.org/) (versão 18 ou superior).

---

### 1. Inicializando o Backend (Docker)

Abra o terminal na raiz principal do projeto (onde encontra-se o arquivo `docker-compose.yml`) e execute:
