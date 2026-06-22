# Backend Django (API REST de Gestão de TCCs)
FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

# Dependências
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Código
COPY . .

EXPOSE 8000

# O entrypoint aplica migrações, popula dados e sobe o servidor.
RUN chmod +x /app/entrypoint.sh
CMD ["/app/entrypoint.sh"]
