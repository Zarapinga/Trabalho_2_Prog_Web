# Guia de Contribuição - Frontend

Obrigado por contribuir! Por favor, siga este guia para manter o projeto consistente.

## Antes de Começar

1. Fork o repositório
2. Clone seu fork: `git clone https://github.com/seu-usuario/repo.git`
3. Crie uma branch: `git checkout -b feat/sua-feature`

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Executar testes
npm test

# Executar linter
npm run lint

# Build para produção
npm run build
```

## Escrevendo Código

1. Siga as [Convenções de Código](./CODING_STANDARDS.md)
2. Adicione testes para novas funcionalidades
3. Mantenha cobertura de testes alta (> 80%)
4. Documente componentes e funções públicas com JSDoc

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adiciona novo componente UserCard
fix: corrige bug em validação de email
test: adiciona testes para UserCard
docs: atualiza README
style: formata código
refactor: simplifica lógica de filtro
```

## Testes

- Coloque testes ao lado do código testado
- Use nomenclatura clara: `deve fazer X quando Y`
- Mire por alta cobertura (idealmente > 80%)

```bash
# Executar testes em watch mode
npm test -- --watch

# Ver cobertura
npm test -- --coverage

# Interface visual
npm test:ui
```

## Pull Request

1. Atualize a branch: `git pull origin main`
2. Execute testes localmente: `npm test`
3. Execute linter: `npm run lint`
4. Push para seu fork: `git push origin seu-branch`
5. Abra um PR na branch `main`

### Título do PR

Use o mesmo formato de commits:

```
feat: adiciona filtro por departamento na página de TCCs
```

### Descrição do PR

Inclua:

- O que foi feito
- Por quê
- Como testar
- Screenshots (se UI)

## Revisão

- Espere revisão de um mantenedor
- Responda aos comentários
- Faça ajustes se solicitado
- Uma vez aprovado, o PR será mergeado

## Problemas Comuns

### Testes Falhando

```bash
# Limpar cache
npm test -- --clearCache

# Executar teste específico
npm test -- src/utils/format.test.ts
```

### Build Falhando

```bash
# Verificar tipos TypeScript
npm run build
```

### Linter Erros

```bash
# Corrigir automaticamente
npm run lint -- --fix
```

## Dúvidas?

- Abra uma issue
- Comente no PR
- Discuta em discussões do repositório

Obrigado por contribuir! 🎉
