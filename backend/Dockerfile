FROM python:3.10-alpine

# Установка переменных окружения
ENV PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app \
    DJANGO_SETTINGS_MODULE=backend.settings

# Установка системных зависимостей
RUN apk add --no-cache \
    postgresql-dev \
    gcc \
    python3-dev \
    musl-dev \
    linux-headers \
    gettext

WORKDIR /app

# Копируем и устанавливаем зависимости
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем проект
COPY . .

# Создаём директории для статики и медиа
RUN mkdir -p /app/static /app/media && chmod -R 755 /app/static /app/media

# Команда по умолчанию
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]