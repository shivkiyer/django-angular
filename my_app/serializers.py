from rest_framework import serializers
# from django.contrib.auth.models import User
from my_app.models import Company, UserToken


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User

class CompanySerializer(serializers.ModelSerializer):
    # user_manager = UserSerializer
    class Meta:
        model = Company
        fields = (
            'id',
            'user_manager',
            'name',
            'headquarters',
            'address',
            'company_website',
            'established_year'
        )


class UserTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserToken
        fields = (
            'username',
            'jwt_token',
        )
