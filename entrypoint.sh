#!/bin/sh
set -e

# Aguarda o PostgreSQL ficar disponível antes de migrar.
if [ -n "$POSTGRES_DB" ]; then
  echo "Aguardando o PostgreSQL em $POSTGRES_HOST:$POSTGRES_PORT..."
  until python -c "import socket,sys,os; s=socket.socket(); s.settimeout(2); \
    sys.exit(0) if s.connect_ex((os.environ.get('POSTGRES_HOST','db'), \
    int(os.environ.get('POSTGRES_PORT','5432')))) == 0 else sys.exit(1)" 2>/dev/null; do
    sleep 1
  done
  echo "PostgreSQL disponível."
fi

python manage.py migrate --noinput

# Popula dados de exemplo apenas se o banco estiver vazio.
# Usa django.setup() para obter só a contagem, sem ruído do manage.py shell.
TCC_COUNT=$(python -c "import django,os; os.environ.setdefault('DJANGO_SETTINGS_MODULE','tcc_project.settings'); django.setup(); from core.models import TCC; print(TCC.objects.count())")
if [ "$TCC_COUNT" = "0" ]; then
  echo "Banco vazio — populando com dados de exemplo (load.py)..."
  python load.py
fi

exec python manage.py runserver 0.0.0.0:8000
