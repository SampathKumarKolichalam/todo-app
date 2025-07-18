from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from django.core.mail import send_mail
from .models import Task

@receiver(post_save, sender=Task)
def send_due_soon_email(sender, instance, created, **kwargs):
    if instance.due_date and not instance.is_complete:
        now_utc = timezone.now()
        due_date_local = timezone.localtime(instance.due_date)
        now_local = timezone.localtime(now_utc)
        
        time_diff = (instance.due_date - now_utc).total_seconds()
        
        print("========== Email Reminder Check ==========")
        print(f"Task Title: {instance.title}")
        print(f"Due Date (Local MST): {due_date_local}")
        print(f"Current Time (Local MST): {now_local}")
        print(f"Time diff (seconds): {time_diff}")
        print("==========================================")

        # Due in next 1 hour
        if 0 < time_diff <= 3600:
            subject = f"Task Reminder: {instance.title} is due soon"
            message = (
                f"Hello {instance.user.username},\n\n"
                f"Your task '{instance.title}' is due at {due_date_local.strftime('%Y-%m-%d %H:%M')}.\n"
                f"Don't forget to complete it!\n\n"
                f"Task Description: {instance.description}"
            )
            send_mail(
                subject,
                message,
                "sampathkumarkolichalam@gmail.com",
                [instance.user.email],
                fail_silently=False,
            )

print("Signals module loaded!")
