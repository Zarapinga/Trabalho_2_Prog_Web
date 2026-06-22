# Projeto de Gestão de TCCs

Este projeto é uma API REST para gerenciamento de Trabalhos de Conclusão de Curso (TCC), Alunos e Professores. Ele serve como base para o desenvolvimento de um frontend na tecnologia de sua escolha. O backend do projeto já está pronto e foi desenvolvido usando Django REST Framework - DRF.

## Material de Apoio

* [django-rest-framework](https://www.django-rest-framework.org/)

## Requisitos do Trabalho

1. **Tecnologia Frontend:**
    * Escolha livre: React, Vue.js, Angular, Flutter, etc.
2. **Funcionalidades:**
    * Listagem e busca de **Alunos**, **Professores**, **Cursos**, **Departamentos**, **Unidades Acadêmicas** e **TCCs**.
    * Cadastramento de TCCS
    * Interface para Alterar o Status
3. **Gestão de Arquivos (Upload):**
    * No cadastro de TCC, o aluno deve ser capaz de fazer o **upload de um arquivo PDF** do trabalho.
    * O frontend deve exibir um link para download/visualização do arquivo na listagem.
4. **Dashboard de Estatísticas:**
    * Implementar uma tela ou seção de **Dashboard** que consuma o endpoint de estatísticas e exiba os dados (preferencialmente usando gráficos).
5. **Não é necessário controle de permissão ou login.**
6. **Entrega:**
    * Enviar o link do github do código Backend e Frontend via **Campus Virtual**.

## Endpoints da API

* **Unidades Acadêmicas:** `http://127.0.0.1:8000/api/unidades-academicas/`
* **Departamentos:** `http://127.0.0.1:8000/api/departamentos/`
* **Cursos:** `http://127.0.0.1:8000/api/cursos/`
* **Alunos:** `http://127.0.0.1:8000/api/alunos/`
* **Professores:** `http://127.0.0.1:8000/api/professores/`
* **TCCs:** `http://127.0.0.1:8000/api/tccs/`
* **Estatísticas (Dashboard):** `http://127.0.0.1:8000/api/tccs/estatisticas/`

### Detalhes do Endpoint de TCCs

Ao enviar um TCC via POST/PUT, utilize `multipart/form-data` para o campo `arquivo`.
Status disponíveis:

* `0`: Em Elaboração
* `1`: Enviado
* `2`: Aprovado
* `3`: Reprovado

### Estrutura do JSON de Estatísticas

O endpoint `/api/tccs/estatisticas/` retorna:

```json
{
    "total_geral": 10,
    "por_status": {
        "Aprovado": 3,
        "Em Elaboração": 2,
        ...
    },
    "por_orientador": {
        "Prof. Dr. Ricardo": 4,
        ...
    }
}
```

## Como Executar (Docker — backend + frontend + PostgreSQL)

A forma mais simples de subir todo o sistema (API + interface React + banco
PostgreSQL) é via `docker-compose`, a partir da raiz do repositório:

```bash
docker compose up --build
```

* Frontend (React): http://localhost:8080
* API (backend): http://localhost:8000/api/

As migrações e a carga inicial de dados (`load.py`) são executadas
automaticamente na primeira subida.

## Como Executar (backend manualmente)

> Requer **Python 3.12+** (Django 6.0). Sem variáveis de ambiente de
> PostgreSQL definidas, o backend usa SQLite local.

1. `python3.12 -m venv venv`
2. `source venv/bin/activate` Linux
3. `venv\Scripts\activate` Windows
4. `pip install -r requirements.txt`
5. `python manage.py makemigrations core`
6. `python manage.py migrate`
7. `python load.py` (para popular dados iniciais)
8. `python manage.py runserver`

O frontend React fica na pasta [`frontend/`](frontend/) — veja o README de lá.

Para visualização das informações acesse os endpoints, como o exemplo: [http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/).

**Dica para o Frontend:** Lembre-se que para o upload de arquivos você não envia um JSON comum, mas sim um objeto `FormData`.
