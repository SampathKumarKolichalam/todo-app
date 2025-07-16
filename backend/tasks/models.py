from django.db import models
from django.contrib.auth.models import User

PRIORITY_CHOICES = [
    ('LOW', 'Low'),
    ('MED', 'Medium'),
    ('HIGH', 'High'),
]

class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    due_date = models.DateTimeField()
    is_complete = models.BooleanField(default=False)
    priority = models.CharField(max_length=5, choices=PRIORITY_CHOICES, default='MED')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.user.username})"
