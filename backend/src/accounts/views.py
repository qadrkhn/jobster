from accounts.serializers import RegisterSerializer, LoginSerializer, UpdateUserSerializer
from utils.helper_functions import format_errors

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.viewsets import ModelViewSet

from django.contrib.auth import get_user_model


class AccountViewset(ModelViewSet):
    def patch(self, request, *args, **kwargs):
        user = request.user
        serializer = UpdateUserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            refresh = RefreshToken.for_user(user)

            return Response({
                'user': {
                    'email': user.email,
                    'lastName': user.last_name,
                    'location': user.location,
                    'name': user.name,
                    'token': str(refresh.access_token),
                }
            }, status=status.HTTP_200_OK)

        errors = format_errors(serializer.errors)
        return Response({"msg": errors}, status=status.HTTP_400_BAD_REQUEST)

class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            name = serializer.validated_data['name']

            if get_user_model().objects.filter(email=email).exists():
                return Response({"msg": "User with this email already exists."}, status=status.HTTP_400_BAD_REQUEST)

            user = get_user_model().objects.create_user(
                email=email,
                password=password,
                name=name,
            )

            refresh = RefreshToken.for_user(user)

            return Response({
                'user' : {
                    'email': user.email,
                    'lastName': user.last_name,
                    'location': user.location,
                    'name': user.name,
                    'token': str(refresh.access_token)
                }
            }, status=status.HTTP_201_CREATED)

        errors = format_errors(serializer.errors)
        return Response({"msg": errors}, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            try:
                user = get_user_model().objects.get(email=email)
                if user.check_password(password):
                    refresh = RefreshToken.for_user(user)
                    return Response({
                        'user' : {
                            'email': user.email,
                            'lastName': user.last_name,
                            'location': user.location,
                            'name': user.name,
                            'token': str(refresh.access_token)
                        }
                    }, status=status.HTTP_200_OK)
                else:
                    return Response({"msg": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
            except get_user_model().DoesNotExist:
                return Response({"msg": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        errors = format_errors(serializer.errors)
        return Response({"msg": errors}, status=status.HTTP_400_BAD_REQUEST)
