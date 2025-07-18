from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

PRIORITY_CHOICES = [
    ('LOW', 'Low'),
    ('MED', 'Medium'),
    ('HIGH', 'High'),
]

class TaskQuerySet(models.QuerySet):
    def overdue(self):
        return self.filter(is_complete=False, due_date__lt=timezone.now())

class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    due_date = models.DateTimeField(null=True, blank=True)
    is_complete = models.BooleanField(default=False)
    priority = models.CharField(max_length=5, choices=PRIORITY_CHOICES, default='MED')
    created_at = models.DateTimeField(auto_now_add=True)

    objects = TaskQuerySet.as_manager()  

    def __str__(self):
        return f"{self.title} ({self.user.username})"
