import os
import sys
import django
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes
from asgiref.sync import sync_to_async  # Используем asgiref

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
    return Moderator.objects.update_or_create(
        username=username,
        defaults={'chat_id': chat_id}
    )


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user = update.effective_user
    chat_id = update.effective_chat.id

    # Используем асинхронную обертку
    moderator, created = await update_or_create_moderator(
        user.username,
        chat_id
    )

    await update.message.reply_text(
        f"✅ Вы успешно зарегистрированы как модератор!\n"
        f"Ваш chat_id: {chat_id}"
    )


def main() -> None:
    from django.conf import settings
    application = Application.builder().token(settings.TELEGRAM_BOT_TOKEN).build()
    application.add_handler(CommandHandler("start", start))
    print("Бот запущен и работает...")
    application.run_polling()


if __name__ == '__main__':
    main()
