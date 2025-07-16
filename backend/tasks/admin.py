from django.contrib import admin
from .models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'due_date', 'priority', 'is_complete')
    list_filter = ('is_complete', 'priority', 'user')
    search_fields = ('title', 'description', 'user__username')
