from accounts.models import Account

from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

class UpdateUserSerializer(serializers.ModelSerializer):
    lastName = serializers.CharField(source='last_name', required=False)

    class Meta:
        model = Account
        fields = ['email', 'name', 'lastName', 'location']
        extra_kwargs = {
            'email': {'required': False},
            'name': {'required': False},
            'location': {'required': False},
        }

    def validate_email(self, value):
        user = self.instance
        if user.email != value and Account.objects.filter(email=value).exclude(pk=user.pk).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=6)
    name = serializers.CharField()
