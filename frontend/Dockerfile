# frontend/Dockerfile
FROM nginx:alpine

# Создаем директорию
RUN mkdir -p /usr/share/nginx/html

# Копируем все файлы фронтенда
COPY . /usr/share/nginx/html/

# Копируем конфигурацию nginx
COPY ../nginx/frontend.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
