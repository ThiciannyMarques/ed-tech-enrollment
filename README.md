markdown
# EdTech Enrollment System

Sistema de matrículas estudantis com frontend em Vue.js e backend em Node.js.

## 🛠 Tecnologias

- **Frontend**: Vue 3 (Vuetify)
- **Backend**: Node.js (Express + Knex.js)
- **Banco de Dados**: PostgreSQL (Docker ou local)

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js v18+
- Git
- (Opcional) Docker e Docker Compose (recomendado)

### 📦 Método Recomendado (com Docker)

1. **Inicie o banco de dados**:
   ```bash
   docker-compose up -d

Instale as dependências:

    ```bash
   npm run install-all

Execute as migrações:

```bash
cd server

# Criar arquivo de ambiente
cp .env-example .env
npx knex migrate:latest


Inicie os servidores:

```bash
npm run dev

⚙️ Método Alternativo (sem Docker)
Configure o PostgreSQL localmente:

Crie um banco chamado edtech

Configure o arquivo .env no diretório server:

env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=edtech
Siga os passos 2-4 do método com Docker

🌐 URLs de Acesso
API: http://localhost:3001

Frontend: http://localhost:8080

🛠 Comandos Úteis
Comando	Descrição
npm run dev	Inicia o servidor em desenvolvimento
npx knex migrate:latest	Executa migrações do banco
docker-compose down	Para o container do PostgreSQL
