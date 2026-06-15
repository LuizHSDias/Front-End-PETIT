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
- Render
- Docker

---