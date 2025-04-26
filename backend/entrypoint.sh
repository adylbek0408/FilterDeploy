#!/bin/sh

# Ждем, пока Postgres станет доступен
echo "Waiting for PostgreSQL..."
while ! nc -z postgres 5432; do
  sleep 0.5
done
echo "PostgreSQL started"

# Применяем миграции
python manage.py migrate

# Собираем статические файлы
python manage.py collectstatic --noinput

# Выполняем команду, переданную в docker-compose
exec "$@"

