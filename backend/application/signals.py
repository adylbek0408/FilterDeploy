from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import Order, Moderator
import requests


@receiver(post_save, sender=Order)
def send_order_to_telegram(sender, instance, created, **kwargs):
    if created:
        moderators = Moderator.objects.exclude(chat_id__isnull=True).exclude(chat_id__exact='')
        bot_token = settings.TELEGRAM_BOT_TOKEN

        message = (
            f"🆕 Новый заказ!\n\n"
            f"📝 ID: {instance.id}\n"
            f"📅 Дата: {instance.created_at.strftime('%Y-%m-%d %H:%M')}\n"
            f"👤 Имя: {instance.name}\n"
            f"📞 Телефон: {instance.phone}\n"
            f"🔄 Статус: {instance.get_status_display()}"
        )

        for moderator in moderators:
            url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
            data = {
                "chat_id": moderator.chat_id,
                "text": message,
                "parse_mode": "HTML"
            }
            try:
                requests.post(url, data=data)
            except Exception as e:
                # Handle any errors here
                print(f"Failed to send message to {moderator.username}: {e}")
