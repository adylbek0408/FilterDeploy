FROM python:3.10-alpine

# Устанавливаем переменные окружения
ENV PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app \
    DJANGO_SETTINGS_MODULE=backend.settings \
    LANG=ru_RU.UTF-8 \
    LANGUAGE=ru_RU:ru \
    LC_ALL=ru_RU.UTF-8

# Установка необходимых пакетов
RUN apk add --no-cache \
    postgresql-dev \
    gcc \
    musl-dev \
    gettext \
    tzdata \
    && cp /usr/share/zoneinfo/Asia/Bishkek /etc/localtime \
    && echo "Asia/Bishkek" > /etc/timezone

WORKDIR /app

# Копируем и устанавливаем зависимости
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем проект
COPY backend/ .

# Создаём директории для статики и медиа
RUN mkdir -p /app/static /app/media && chmod -R 755 /app/static /app/media

# Создаём и компилируем файлы локализации
RUN mkdir -p locale/ru/LC_MESSAGES

# Команда по умолчанию
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]