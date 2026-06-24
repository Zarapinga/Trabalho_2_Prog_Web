# Convenções de Código - Frontend

Este documento descreve as convenções de código para o frontend da aplicação.

## Geral

- **Linguagem**: TypeScript para toda a aplicação
- **Framework**: React 19
- **UI Library**: Material-UI (MUI)
- **State Management**: React Hooks (useState, useContext)
- **HTTP Client**: Axios
- **Roteamento**: React Router v7
- **Build Tool**: Vite
- **Testes**: Vitest + Testing Library

## TypeScript

### Tipagem Explícita

Sempre defina tipos explícitos para props, estados e retorno de funções:

```typescript
// ✅ Bom
interface UserProps {
  id: number;
  name: string;
  email?: string;
}

export function UserCard({ id, name, email }: UserProps) {
  // ...
}

// ❌ Ruim
export function UserCard(props: any) {
  // ...
}
```

### Tipos Genéricos

Use tipos genéricos para componentes e utilitários reutilizáveis:

```typescript
// ✅ Bom
export function useAsync<T>(initialData?: T): AsyncState<T> {
  // ...
}

// ❌ Ruim
export function useAsync(initialData: any): any {
  // ...
}
```

## React

### Componentes

- Prefira componentes funcionais
- Coloque props em uma interface `interface Props`
- Adicione JSDoc para componentes públicos
- Use `type` para tipos simples, `interface` para objetos complexos

```typescript
/**
 * Componente de card de usuário
 * @component
 * @example
 * return <UserCard id={1} name="João" />
 */
export function UserCard({ id, name }: Props) {
  return <div>{name}</div>;
}
```

### Hooks

- Nomeie hooks customizados com `use` prefix
- Use hooks da biblioteca `@testing-library/react` para testes
- Documente efeitos colaterais com comentários

```typescript
export function useUser(id: number) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser(id).then(setUser);
  }, [id]); // Dependências documentadas

  return user;
}
```

### Estado

- Use `useState` para estado local simples
- Use `useContext` para estado compartilhado entre componentes
- Mantenha estado perto de onde é usado

```typescript
// ✅ Bom
export function Form() {
  const [submitted, setSubmitted] = useState(false);
  // Estado usado apenas neste componente
}

// ❌ Ruim - mover estado para componente pai se precisa compartilhar
```

## Estrutura de Pastas

```
src/
├── api/              # Cliente HTTP e tipos de API
│   ├── client.ts     # Configuração do axios
│   ├── endpoints.ts  # Funções de endpoints
│   └── types.ts      # Tipos de resposta
├── components/       # Componentes reutilizáveis
├── pages/            # Componentes de página (roteadas)
├── hooks/            # Hooks customizados
├── utils/            # Funções utilitárias
├── types/            # Tipos globais
├── theme.ts          # Configuração de tema
├── constants.ts      # Constantes da aplicação
└── App.tsx           # Componente raiz
```

## Nomes

### Arquivos e Pastas

- Use `kebab-case` para pastas e nomes de arquivo: `user-list.tsx`
- Exceção: Componentes React usam `PascalCase`: `UserList.tsx`
- Testes: `arquivo.test.ts` ou `arquivo.test.tsx`

### Variáveis e Funções

- Use `camelCase`: `userData`, `fetchUser()`
- Componentes React: `PascalCase`: `UserCard`
- Constantes: `UPPER_SNAKE_CASE`: `MAX_RETRIES`
- Tipos/Interfaces: `PascalCase`: `UserData`, `Props`

```typescript
// ✅ Bom
const maxRetries = 3;
const MAX_RETRIES = 3;
function fetchUser() {}
interface UserData {}

// ❌ Ruim
const max_retries = 3;
const MaxRetries = 3;
function fetch_user() {}
```

## Formatação

- Máximo 80-100 caracteres por linha
- 2 espaços para indentação
- Chaves na mesma linha

```typescript
// ✅ Bom
function User() {
  return (
    <div>
      <p>User</p>
    </div>
  );
}

// ❌ Ruim
function User()
{
  return (
    <div>
      <p>User</p>
    </div>
  );
}
```

## Imports

- Agrupe imports: React/bibliotecas, componentes locais, tipos
- Use imports nomeados quando possível

```typescript
// ✅ Bom
import type { ReactNode } from "react";
import { useState } from "react";

import { Button } from "@mui/material";

import UserCard from "../components/UserCard";
import type { User } from "../types/models";

// ❌ Ruim
import * as React from "react";
import * as MUI from "@mui/material";
const UserCard = require("../components/UserCard");
```

## Comentários e Documentação

### JSDoc

Documente componentes e funções públicas:

```typescript
/**
 * Formata uma data em formato brasileiro
 * @param date - Data a formatar
 * @param withTime - Incluir hora (padrão: false)
 * @returns Data formatada como DD/MM/YYYY ou DD/MM/YYYY HH:MM
 */
export function formatDate(date: Date, withTime?: boolean): string {
  // ...
}
```

### Comentários Inline

Use comentários para explicar **por quê**, não o **quê**:

```typescript
// ✅ Bom
// Precisamos filtrar usuários ativos porque o backend
// não suporta esse filtro nativamente
const activeUsers = users.filter((u) => u.active);

// ❌ Ruim
// Filtrar usuários
const activeUsers = users.filter((u) => u.active);
```

## Testes

- Coloque testes ao lado do código
- Uma suite por arquivo testado
- Testes descritivos em português

```typescript
describe("formatDate", () => {
  it("deve formatar data sem hora", () => {
    const result = formatDate(new Date("2024-01-15"));
    expect(result).toBe("15/01/2024");
  });
});
```

## Performance

### Renderização

- Use `React.memo` para componentes que recebem muitas props
- Use `useCallback` para callbacks em listas
- Use `useMemo` apenas quando necessário

```typescript
// ✅ Quando há muitas renderizações
export const UserCard = React.memo(function UserCard({ user }: Props) {
  return <div>{user.name}</div>;
});
```

### Requisições HTTP

- Use hooks para compartilhar lógica de fetch
- Trate erros da API adequadamente
- Use `AbortController` para cancelar requisições

## Acessibilidade

- Use atributos `aria-*` apropriados
- Certifique-se que campos de formulário tem labels
- Use semântica HTML correta

```typescript
// ✅ Bom
<label htmlFor="email">Email:</label>
<input id="email" type="email" aria-required="true" />

// ❌ Ruim
<input type="email" placeholder="Email" />
```

## Segurança

- Nunca armazene tokens de autenticação em localStorage
- Use variáveis de ambiente para URLs sensíveis
- Escapeie conteúdo dinâmico (React faz isso por padrão)

## Linting e Formatação

O projeto usa ESLint. Sempre execute antes de committar:

```bash
npm run lint
```

Corrija automaticamente quando possível:

```bash
npm run lint -- --fix
```
