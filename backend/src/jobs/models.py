from django.db import models
from django.conf import settings

class Job(models.Model):
    JOB_TYPE_CHOICES = [
        ('full-time', 'Full-time'),
        ('part-time', 'Part-time'),
        ('remote', 'Remote'),
        ('internship', 'Internship'),
    ]

    STATUS_CHOICES = [
        ('interview', 'Interview'),
        ('declined', 'Declined'),
        ('pending', 'Pending'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='jobs'
    )

    position = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    job_location = models.CharField(max_length=255)
    job_type = models.CharField(max_length=20, choices=JOB_TYPE_CHOICES, default='full-time')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.position} at {self.company}"
