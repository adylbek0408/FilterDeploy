import os
import sys
import django
import logging
import asyncio
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes
from asgiref.sync import sync_to_async

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Добавляем путь к проекту в sys.path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)

# Настройка Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from application.models import Moderator


# Обертка для синхронных операций с БД
@sync_to_async(thread_sensitive=True)
def update_or_create_moderator(username, chat_id):
    try:
        return Moderator.objects.update_or_create(
            username=username,
            defaults={'chat_id': chat_id}
        )
    except Exception as e:
        logger.error(f"Ошибка при сохранении модератора: {e}")
        raise


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    try:
        user = update.effective_user
        chat_id = update.effective_chat.id
        username = user.username or f"user_{user.id}"  # Обработка случая, когда username отсутствует

        # Используем асинхронную обертку
        moderator, created = await update_or_create_moderator(
            username,
            chat_id
        )

        if created:
            message = f"✅ Вы успешно зарегистрированы как модератор!\nВаш chat_id: {chat_id}"
        else:
            message = f"✅ Ваши данные обновлены!\nВаш chat_id: {chat_id}"

        await update.message.reply_text(message)
    except Exception as e:
        logger.error(f"Ошибка в обработчике start: {e}")
        await update.message.reply_text("Произошла ошибка при регистрации. Пожалуйста, попробуйте позже.")


async def error_handler(update: object, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработка ошибок бота"""
    logger.error(f"Произошла ошибка: {context.error}")


def main() -> None:
    from django.conf import settings

    try:
        # Создаем приложение с расширенными настройками для устойчивости
        application = Application.builder() \
            .token(settings.TELEGRAM_BOT_TOKEN) \
            .connection_pool_size(8) \
            .pool_timeout(30) \
            .connect_timeout(30) \
            .read_timeout(30) \
            .write_timeout(30) \
            .build()

        # Добавляем обработчики
        application.add_handler(CommandHandler("start", start))
        application.add_error_handler(error_handler)

        # Запускаем бота с обработкой ошибок
        logger.info("Бот запущен и работает...")
        application.run_polling(
            allowed_updates=Update.ALL_TYPES,
            drop_pending_updates=True,
            close_loop=False  # Не закрываем цикл событий сразу
        )
    except Exception as e:
        logger.error(f"Критическая ошибка при запуске бота: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()