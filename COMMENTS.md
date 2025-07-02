# COMMENTS.md

## Decisão da Arquitetura Utilizada

Optei por uma arquitetura cliente-servidor (frontend/backend) com as seguintes características:

**Backend (Node.js):**
- Estrutura MVC (Model-View-Controller) adaptada para API REST
- Camadas bem definidas:
  - Routes: Endpoints da API
  - Controllers: Lógica de tratamento das requisições
  - Services: Regras de negócio
  - Models: Interação com o banco de dados
- Banco de dados PostgreSQL com Knex.js como query builder
- Validações com express-validator e Yup
- Segurança básica com helmet, cors e rate limiting

**Frontend (Vue 3 + Vuetify):**
- Composition API com Pinia para state management
- Componentização seguindo princípios Atomic Design
- Vuetify para componentes UI consistentes
- VeeValidate para validação de formulários
- Vue Router para navegação
- Axios para comunicação com a API
- Internacionalização básica com vue-i18n

**Princípios aplicados:**
- Clean Code (nomenclatura clara, funções pequenas, responsabilidade única)
- SOLID (especialmente Single Responsibility e Dependency Inversion)
- DRY (reutilização de código)
- Separação de preocupações

## Lista de Bibliotecas de Terceiros Utilizadas

**Backend:**
- `express`: Framework web
- `pg` + `knex`: Acesso ao PostgreSQL e query builder
- `express-validator`: Validação de dados de entrada
- `helmet`: Segurança HTTP
- `cors`: Controle de acesso CORS
- `morgan`: Logging de requisições
- `dotenv`: Gerenciamento de variáveis de ambiente
- `bcrypt`: Hash de senhas (para futura implementação de auth)
- `jsonwebtoken`: Autenticação JWT (para futura implementação)

**Frontend:**
- `vue` + `vue-router`: Framework principal e roteamento
- `vuetify`: Componentes UI
- `pinia`: Gerenciamento de estado
- `axios`: Cliente HTTP
- `vee-validate` + `yup`: Validação de formulários
- `vue-i18n`: Internacionalização
- `v-mask`: Máscara para campos como CPF

**Ferramentas de Desenvolvimento:**
- `eslint` + `prettier`: Linting e formatação
- `nodemon`: Reinício automático do backend
- `vite`: Build tool para frontend

## Melhorias Futuras (se tivesse mais tempo)

**Testes:**
- [ ] Testes unitários no backend com Jest (controllers, services)
- [ ] Testes unitários no frontend com Vitest (componentes, stores)
- [ ] Testes de integração API
- [ ] Testes E2E com Cypress

**Segurança:**
- [ ] Validação mais robusta de entrada

**Features:**
- [ ] Matrícula em turmas (relacionamento aluno-turma)
- [ ] Upload de foto do aluno
- [ ] Exportação de dados (CSV, PDF)
- [ ] Dashboard com estatísticas
- [ ] Busca avançada com filtros

**Performance:**
- [ ] Paginação no backend
- [ ] Cache para listagens frequentes
- [ ] Otimização de queries SQL

**Infra:**
- [ ] Configuração CI/CD
- [ ] Health checks

## Requisitos Opicionais Não Entregues

- [ ] Testes automatizados (unitários/integração) - Não implementados devido a restrições de tempo
- [ ] Documentação mais detalhada da API (Swagger/OpenAPI)

Todos os demais requisitos obrigatórios foram implementados, incluindo:
- CRUD completo de alunos
- Validações de campos obrigatórios
- Campos editáveis e não-editáveis conforme especificado
- Fluxo completo conforme histórias de usuário
- Tratamento de erros básico
- Validação de formato de email e campos únicos
- Camada de segurança(Autenticação JWT, Autorização por roles (admin, user), Proteção de rotas sensíveis)

## Observações Finais

O projeto foi desenvolvido seguindo Git Flow, com branches feature para cada funcionalidade significativa. O código está escrito em inglês conforme solicitado e segue convenções de Clean Code.

Apesar da ausência de testes automatizados (devido ao tempo limitado), a estrutura do projeto foi preparada para facilitar sua implementação futura.