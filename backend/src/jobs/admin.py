from django.contrib import admin

from jobs.models import Job

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('position', 'company', 'job_location', 'job_type', 'status', 'user', 'created_at')
    list_filter = ('job_type', 'status', 'created_at')
    search_fields = ('position', 'company', 'job_location', 'user__email')
    ordering = ('-created_at',)
