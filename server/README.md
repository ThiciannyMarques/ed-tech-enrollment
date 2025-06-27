# Backend API - Documentação

## 📋 Visão Geral
API Node.js/Express para sistema acadêmico com PostgreSQL, seguindo boas práticas de segurança e desenvolvimento.

## 🚀 Começando

### Pré-requisitos
- Node.js 18+
- PostgreSQL 14+
- Docker (opcional)

### Instalação
```bash
# Instalar dependências
npm install

# Criar arquivo de ambiente
cp .env-example .env
```

## 🛠️ Comandos Essenciais

| Comando                     | Descrição                                  |
|-----------------------------|--------------------------------------------|
| `npm run dev`               | Inicia servidor em desenvolvimento        |
| `npm run lint`              | Executa linter                            |
| `npm run format`            | Formata código                            |
| `npx knex migrate:latest`   | Executa todas as migrations pendentes     |
| `npx knex seed:run`         | Popula o banco com dados iniciais         |
| `npx knex migrate:rollback` | Reverte a última migration                |


## 🐳 Docker (Backend Only)

### Configuração
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001
CMD ["npm", "run", "dev"]
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  db:
    image: postgres:14
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: edtech
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  api:
    build: .
    ports:
      - "3001:3001"
    environment:
      - DB_HOST=db
      - DB_USER=postgres
      - DB_PASSWORD=postgres
      - DB_NAME=edtech
    depends_on:
      - db

volumes:
  pgdata:
```
### Uso
```bash
# Iniciar containers, fora da pasta /server

docker-compose up -d

# Parar containers, fora da pasta /server
docker-compose down
```
## 📦 Gerenciamento do Banco de Dados

### 1. Primeira Configuração
```bash
# Criar banco de dados (execute apenas se não usar Docker)
createdb edtech

# Executar migrations
npx knex migrate:latest

# Popular dados iniciais
npx knex seed:run
```


### Comandos Docker + Knex
```bash
# Executar migrations dentro do container
docker-compose exec api npx knex migrate:latest

# Executar seeds dentro do container
docker-compose exec api npx knex seed:run
```

## 🌟 Dica Rápida
Para desenvolvimento local sem Docker, após criar o banco manualmente:
```bash
# Configurar conexão no .env e depois:
npx knex migrate:latest && npx knex seed:run
npm run dev
```

---


## 📦 Estrutura do Projeto
```
server/
├── src/
│   ├── controllers/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeds/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   └── server.js
├── .env-example
├── .eslintrc.js
├── .prettierrc
├── Dockerfile
├── docker-compose.yml
└── knexfile.js
```

## 🔒 Segurança
- Helmet para headers de segurança
- Rate limiting
- Validação de entrada
- Variáveis sensíveis em `.env`

## 🌐 Rotas Principais
```
GET    /api/students     - Listar alunos
POST   /api/students     - Criar aluno
GET    /api/students/:ra - Buscar aluno
PUT    /api/students/:ra - Atualizar aluno
DELETE /api/students/:ra - Remover aluno
```

### ⚠️ Notas Importantes:
1. Para desenvolvimento local sem Docker, configure manualmente o PostgreSQL
