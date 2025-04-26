from django.db import models
from django.utils import timezone


class Order(models.Model):
    STATUS_CHOICES = [
        ('new', 'Новый'),
        ('processed', 'В обработке'),
        ('сompleted', 'Завершен'),
    ]
    name = models.CharField(max_length=255, verbose_name='Имя клиента')
    phone = models.CharField(max_length=20, verbose_name='Номер телефона')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата заказа')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new', verbose_name='Статус')

    def __str__(self):
        return f"Заказ #{self.id} - {self.name}"

    def save(self, *args, **kwargs):
        if not self.id:
            self.created_at = timezone.now()
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'
        ordering = ['-created_at']


class Moderator(models.Model):
    username = models.CharField(
        max_length=255,
        unique=True,
        verbose_name='Telegram username (без @)',
        help_text='Введите username без символа @'
    )
    chat_id = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name='Telegram Chat ID',
        help_text='Это поле заполнится автоматически после старта бота'
    )

    class Meta:
        verbose_name = 'Модератор'
        verbose_name_plural = 'Модераторы'

