from rest_framework import viewsets, permissions
from jobs.models import Job
from jobs.serializers import JobSerializer

class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer

    def get_queryset(self):
        return Job.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
