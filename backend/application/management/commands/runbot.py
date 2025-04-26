from django.core.management.base import BaseCommand
from application.bot import main


class Command(BaseCommand):
    help = 'Запускает Telegram бота'

    def handle(self, *args, **options):
        main()
