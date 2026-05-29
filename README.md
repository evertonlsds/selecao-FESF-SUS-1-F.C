Seleção FESF-SUS – 1 F.C | Backend API

Esta é uma API RESTful desenvolvida como parte do processo de seleção FESF-SUS (Formação Complementar - Item 01 e Item 02 do Barema). A aplicação consiste em um sistema de CRUD (Create, Read, Update, Delete) para o gerenciamento de dados de **Funcionários** e **Pacientes** de uma clínica médica.

O projeto foi construído seguindo as melhores práticas de desenvolvimento backend, utilizando padrões de mercado para persistência de dados, validação de schemas, conteinerização isolada e segurança de rotas através de autenticação robusta.

---

## 🚀 Tecnologias Utilizadas

* **Linguagem:** [Python 3.10](https://www.python.org/)
* **Framework Web:** [FastAPI](https://fastapi.tiangolo.com/) (Alta performance, suporte nativo a tipagem e documentação automática)
* **ORM / Persistência:** [SQLAlchemy](https://www.sqlalchemy.org/) (Mapeamento Objeto-Relacional para abstração de banco de dados)
* **Banco de Dados:** [SQLite](https://www.sqlite.org/) (Configurado de forma local e integrada para fins de avaliação ágil)
* **Validação de Dados:** [Pydantic v2](https://docs.pydantic.dev/) (Garantia de integridade dos payloads de entrada e saída)
* **Segurança:** OAuth2 com suporte a Bearer Tokens (`python-jose` e `passlib`)
* **Infraestrutura / Containerização:** [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

---

## 🔒 Arquitetura & Segurança (OAuth2)

Em total conformidade com os requisitos do certame, a API conta com uma camada de segurança baseada no protocolo **OAuth2 (Password Flow)**. 

* **Rotas de Leitura (`GET`):** São públicas para facilitar a listagem de registros na interface.
* **Rotas de Escrita (`POST`):** São estritamente protegidas. O sistema exige o envio de um Bearer Token válido no cabeçalho da requisição (`Authorization: Bearer <token>`) para permitir a persistência de novos dados.

---

## 📂 Estrutura do Projeto

A estrutura de arquivos foi mantida de forma coesa e limpa, facilitando a execução direta e garantindo que todas as dependências estejam explicitadas para o avaliador:
