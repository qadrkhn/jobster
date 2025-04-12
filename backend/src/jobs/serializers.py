from rest_framework import serializers
from jobs.models import Job

class JobSerializer(serializers.ModelSerializer):
    jobLocation = serializers.CharField(source='job_location')
    jobType = serializers.ChoiceField(source='job_type', choices=Job.JOB_TYPE_CHOICES)

    class Meta:
        model = Job
        fields = ['id', 'position', 'company', 'jobLocation', 'jobType', 'status', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
