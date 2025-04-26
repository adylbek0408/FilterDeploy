from django.contrib import admin
from .models import Order, Moderator


# Класс для настройки отображения заказов в админке
class OrderAdmin(admin.ModelAdmin):
    # Поля, которые будут отображаться в списке заказов
    list_display = ('id', 'name', 'phone', 'created_at', 'status')

    # Поля, по которым можно фильтровать заказы
    list_filter = ('status', 'created_at')

    # Поля, по которым можно искать заказы
    search_fields = ('name', 'phone')

    # Поля, которые можно редактировать прямо из списка заказов
    list_editable = ('status',)

    # Поля, которые будут отображаться на странице редактирования заказа
    fieldsets = (
        ('Основная информация', {
            'fields': ('name', 'phone', 'status')
        }),
        ('Дополнительная информация', {
            'fields': ('created_at',),
            'classes': ('collapse',)  # Сворачиваемый блок
        }),
    )

    # Поля, которые нельзя редактировать (только для чтения)
    readonly_fields = ('created_at',)


# Класс для настройки отображения модераторов в админке
class ModeratorAdmin(admin.ModelAdmin):
    list_display = ('username', 'chat_id', 'is_active')
    readonly_fields = ('chat_id',)

    def is_active(self, obj):
        return bool(obj.chat_id)

    is_active.boolean = True
    is_active.short_description = 'Активен'


# Регистрируем модели в админке
admin.site.register(Order, OrderAdmin)
admin.site.register(Moderator, ModeratorAdmin)

# Настройки заголовка админ-панели
admin.site.site_header = "Администрирование заказов"
admin.site.site_title = "Заказы"
admin.site.index_title = "Управление заказами и модераторами"
