# Frontend — Gestão de TCCs (React)

Interface web para o sistema de gestão de TCCs, consumindo a API REST em Django
REST Framework que está na raiz deste repositório.

## Tecnologias

- **React 19 + TypeScript** (Vite)
- **Material UI (MUI)** para componentes
- **React Router** para navegação
- **Axios** para chamadas HTTP
- **Recharts** para os gráficos do dashboard

## Funcionalidades

- Dashboard com estatísticas e gráficos (status, tipo, idioma, orientador, curso,
  departamento, semestre).
- Listagem e **busca** de TCCs, Alunos, Professores, Cursos, Departamentos e
  Unidades Acadêmicas.
  - Alunos, Professores e TCCs usam busca no servidor (`?search=`).
  - Cursos, Departamentos e Unidades usam busca no cliente (a API não expõe
    `?search=` para esses recursos).
- Cadastro e edição de TCC com **upload de PDF** (`multipart/form-data`).
- Link para abrir/baixar o PDF na listagem de TCCs.
- Alteração do **status** do TCC diretamente na listagem.

## Pré-requisitos

O backend precisa estar rodando. Na raiz do repositório:

```bash
python3.12 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python load.py            # popula dados de exemplo
python manage.py runserver
```

> O backend requer **Python 3.12+** (Django 6.0).

## Rodando o frontend (desenvolvimento)

```bash
cd frontend
npm install
npm run dev
```

App em http://localhost:5173. A URL da API é lida de `VITE_API_BASE_URL`
(ver `.env`); por padrão `http://127.0.0.1:8000`.

## Build de produção

```bash
npm run build      # gera dist/
npm run preview    # serve o build localmente
```

## Configuração

`.env`:

```
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## Rodando tudo com Docker (recomendado)

Na **raiz do repositório** há um `docker-compose.yml` que sobe PostgreSQL,
backend e frontend de uma vez:

```bash
docker compose up --build
```

- Frontend: http://localhost:8080
- API (backend): http://localhost:8000/api/

O backend aplica as migrações e popula os dados de exemplo automaticamente
na primeira execução.
