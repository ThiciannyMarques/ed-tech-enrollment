```markdown
# 🖥️ Frontend EdTech Enrollment

Aplicação Vue.js para gestão de matrículas estudantis com interface moderna e responsiva.

## 🚀 Primeiros Passos

### Pré-requisitos
- Node.js v18+
- NPM v9+

# Instale as dependências
npm install
```

## ⚙️ Configuração

Crie um arquivo `.env` na pasta `client` (baseado no `.env.example`):

```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_TITLE="EdTech Enrollment"
```

## 🏃 Executando o Projeto

```bash
# Servidor de desenvolvimento (hot-reload)
npm run dev

## 📂 Estrutura do Projeto

```
src/
├── api/              # Chamada de api
├── assets/           # Ícones, imagens e fonts
├── components/       # Componentes reutilizáveis
│   ├── academic/
│   └── cards/       # Componentes específicos de cards
│   └── forms/       # Componentes específicos de forms
│   └── snackBar/    # Componentes específicos de snackBar
│   └── students/    # Componentes específicos de alunos

├── composables/     # Lógica reutilizável
├── router/          # Configuração de rotas
├── stores/          # Gerenciamento de estado (Pinia)
│   └── student.js   # Store para gestão de alunos
│   └── auth.js      # Store para gestão de autenticação
│   └── snackBar.js  # Store para gestão da snackBar

├── styles/          # Estilos globais e variáveis
└── views/           # Páginas principais
    ├── Students/    # Páginas relacionadas a alunos
    └── Home.vue     # Página inicial
```

## 🎨 Componentes Principais

### `StudentList.vue`
- Data table com paginação
- Filtros por nome/RA
- Ações (editar/excluir)

### `StudentForm.vue`
- Formulário reutilizável (create/edit)
- Validação em tempo real
- Máscaras para CPF/RA

### `AppLayout.vue`
- Layout base da aplicação
- Barra de navegação responsiva
- Sistema de temas (claro/escuro)

## 🔌 Integração com API

Configuração do Axios em `src/api/api.js`:

```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
})

// Interceptores para tratamento global de erros
api.interceptors.response.use(
  response => response,
  error => {
    // Tratamento personalizado de erros
    return Promise.reject(error)
  }
)

export default api
```

## 🎛️ Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `VITE_API_URL` | URL base da API | `http://localhost:3001/api` |
| `VITE_APP_TITLE` | Título da aplicação | `EdTech Enrollment` |

## 🛠️ Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Constrói para produção |
| `npm run lint` | Executa ESLint |
| `npm run format` | Formata código com Prettier |

## 📱 Responsividade

A aplicação possui 3 breakpoints principais:

1. **Mobile**: < 600px
   - Menu hamburguer
   - Cards em coluna única

2. **Tablet**: 600px - 960px
   - Layout de 2 colunas
   - Tamanhos de fonte ajustados

3. **Desktop**: > 960px
   - Menu lateral fixo
   - Data tables completas

```