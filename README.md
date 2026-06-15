# PETIT - Sistema de Controle de Empréstimo de Livros

Sistema desenvolvido para o PETIT (Programa de Educação Tutorial Interdisciplinar de Timóteo - CEFET-MG) com o objetivo de auxiliar no gerenciamento de livros, estudantes, petianos e empréstimos.

## Funcionalidades

### Livros
- Cadastro de livros
- Edição e exclusão
- Busca por título
- Controle de ISBN, gênero, editora e autor

### Estudantes
- Cadastro de estudantes
- Controle de matrícula
- Controle de status (ativo/inativo)
- Busca por nome
- Paginação

### Petianos
- Cadastro de petianos
- Controle de níveis de acesso
- Login e senha
- Upload de imagem de perfil

### Empréstimos
- Registro de empréstimos
- Controle de datas de empréstimo e devolução
- Associação entre livro, estudante e petiano

### Dashboard
- Total de estudantes
- Total de livros
- Total de empréstimos
- Empréstimos ativos
- Empréstimos devolvidos
- Empréstimos atrasados
- Total de multas
- Gráficos estatísticos
- Exportação para PDF

### Autenticação
- Login com JWT
- Controle de acesso por perfil

---

## 🛠 Tecnologias Utilizadas

### Back-End
- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- Spring Mail
- JWT Authentication
- Maven

### Front-End
- Angular 17
- TypeScript
- Bootstrap 5
- Chart.js
- jsPDF

### Banco de Dados
- MySQL (desenvolvimento)
- PostgreSQL (produção)

### Deploy
- Docker

---

## Executando o Front-End

### Pré-requisitos

- Node.js 18 ou superior
- Angular CLI 17

### Verificando as versões instaladas

```bash
node -v
npm -v
ng version
```

### Clonando o repositório

```bash
git clone https://github.com/LuizHSDias/Front-End-PETIT
```

### Acessando a pasta do projeto

```bash
cd APP
```

### Instalando as dependências

```bash
npm install
```

### Executando a aplicação

```bash
ng serve
```

A aplicação estará disponível em:

```text
http://localhost:4200
```

---

## Observações

Este repositório contém apenas o Front-End da aplicação.

O Back-End e suas configurações internas não estão disponíveis publicamente por questões de segurança e privacidade.

---

## Autor

**Luiz Henrique Santos Dias**

Estudante de Engenharia de Computação - CEFET-MG

Membro do PETIT (Programa de Educação Tutorial Interdisciplinar de Timóteo)