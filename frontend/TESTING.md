# Testes do Frontend

Este projeto usa **Vitest** para testes unitários e de integração.

## Configuração

Os testes estão configurados em:

- `vitest.config.ts` - Configuração do Vitest
- `frontend/package.json` - Scripts de teste

## Executando Testes

```bash
# Instalar dependências (se ainda não feito)
npm install

# Executar todos os testes
npm test

# Executar em modo watch (re-executa ao detectar mudanças)
npm test -- --watch

# Executar com interface visual
npm test:ui

# Executar testes de um arquivo específico
npm test -- src/utils/format.test.ts

# Gerar relatório de cobertura
npm test -- --coverage
```

## Estrutura de Testes

Os testes estão organizados ao lado dos arquivos principais:

```
src/
├── utils/
│   ├── format.ts
│   ├── format.test.ts
│   ├── validators.ts
│   ├── validators.test.ts
│   ├── errorHandler.ts
│   └── errorHandler.test.ts
├── api/
│   ├── types.ts
│   └── types.test.ts
├── hooks/
│   ├── useAsync.ts
│   └── useAsync.test.ts
├── components/
│   ├── FilterBar.tsx
│   └── FilterBar.test.tsx
└── constants.ts
    └── constants.test.ts
```

## Cobertura de Testes

O projeto inclui testes para:

### Utilitários (`src/utils/`)

- **format.test.ts** - Funções de formatação e transformação de dados
  - `toChartData()` - Conversão para formato de gráfico
  - `indexById()` - Indexação por ID
  - `filterByText()` - Busca e filtro por texto

- **validators.test.ts** - Validadores de formulário
  - `validateRequired()` - Campo obrigatório
  - `validateMinLength()` - Comprimento mínimo
  - `validateMaxLength()` - Comprimento máximo
  - `validateMinWords()` - Mínimo de palavras
  - `validateSelect()` - Seleção de dropdown
  - `validateForm()` - Validação de formulário completo

- **errorHandler.test.ts** - Tratamento de erros da API
  - `getErrorMessage()` - Extrai mensagem de erro
  - `getUserFriendlyMessage()` - Converte para mensagem amigável

### API (`src/api/`)

- **types.test.ts** - Tipos genéricos e factories
  - `createInitialAsyncState()`
  - `createLoadingState()`
  - `createSuccessState()`
  - `createErrorState()`

### Hooks (`src/hooks/`)

- **useAsync.test.ts** - Hooks para operações assíncronas
  - `useAsync()` - Gerenciamento de uma operação async
  - `useAsyncList()` - Gerenciamento de lista async

### Componentes (`src/components/`)

- **FilterBar.test.tsx** - Componente de barra de filtros
  - Renderização de children
  - Botão de limpar filtros
  - Callbacks

## Escrevendo Novos Testes

Exemplo de novo teste:

```typescript
import { describe, it, expect } from "vitest";
import { meuUtilitario } from "./meu-arquivo";

describe("meuUtilitario", () => {
  it("deve fazer algo específico", () => {
    const resultado = meuUtilitario("entrada");
    expect(resultado).toBe("saída esperada");
  });
});
```

## Boas Práticas

1. **Nomenclatura**: Nomes de testes descritivos em português
2. **Estrutura AAA**: Arrange, Act, Assert
3. **Um conceito por teste**: Cada teste verifica uma coisa
4. **Testes isolados**: Sem dependências entre testes
5. **Mocks**: Use `vi.fn()` para mockar funções

## Referências

- [Documentação Vitest](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Vitest API](https://vitest.dev/api/)
