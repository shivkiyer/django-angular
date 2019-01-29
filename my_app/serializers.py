from rest_framework import serializers
from my_app.models import Company, UserToken

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = (
            'id',
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
