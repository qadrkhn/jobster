from accounts.models import Account

from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Account
        fields = ['email', 'name', 'password']

    def validate(self, attrs):
        return attrs

    def create(self, validated_data):
        user = Account.objects.create_user(**validated_data)
        user.set_password(validated_data.get('password', None))
        user.save()

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return {
            'user' : {
                "email": user.email,
                "name": user.name,
                "lastName": user.last_name,
                "location": user.location,
                "token": access_token,
            }
        }
