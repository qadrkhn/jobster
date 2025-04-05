from django.urls import path
from accounts.views import RegisterAPIView, LoginAPIView, AccountViewset

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('updateUser/', AccountViewset.as_view(
        {
            'patch' : 'patch'
        }
    ), name='update-user'),
]
