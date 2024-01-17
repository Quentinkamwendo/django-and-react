from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
# from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ('key',)
