from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.forms.models import model_to_dict
from django.views import View
from django.utils.decorators import method_decorator
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_protect
import json

from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import status

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login

import jwt

from .models import Company, Employee, UserToken
from .serializers import CompanySerializer, UserTokenSerializer

from django.conf import settings

if not settings.DEBUG:
    CSRF_STATUS = True
else:
    CSRF_STATUS = False

# Create your views here.
@method_decorator(csrf_protect, name='secure_create_company')
@method_decorator(csrf_protect, name='secure_modify_company')
@method_decorator(csrf_protect, name='secure_delete_company')
class NewCompany(APIView):
    company_list = []
    def get(self, request, *args, **kwargs):
        get_token(request)
        # Checking the CSRF token that is added to the response object.
        # print(dir(request))
        print(request.COOKIES)
        self.company_list = CompanySerializer(Company.objects.all(), many=True)
        return Response({
            "companies": self.company_list.data
        })

    def create_company(self, request, *args, **kwargs):
        new_company_data = JSONParser().parse(request)
        company_serializer = CompanySerializer(data=new_company_data)
        if company_serializer.is_valid():
            company_serializer.save()
        return Response({
            "company": company_serializer.data
        })


    def secure_create_company(self, request, *args, **kwargs):
        return self.create_company(request, *args, **kwargs)


    def post(self, request, *args, **kwargs):
        # The JSONParser produces the same effect as below with cleaner code
        #new_company_data = json.loads(request.body.decode('utf-8'))
        if CSRF_STATUS:
            return self.secure_create_company(request, *args, **kwargs)
        else:
            return self.create_company(request, *args, **kwargs)


    def modify_company(self, request, *args, **kwargs):
        changed_company_data = JSONParser().parse(request)
        changed_company = Company.objects.get(id=int(changed_company_data['companyId']))
        changed_company_serializer = CompanySerializer(
                        changed_company,
                        data=changed_company_data['companyForm']
                    )
        if changed_company_serializer.is_valid():
            changed_company_serializer.save()
        return Response({
            "company": changed_company_serializer.data
        })


    def secure_modify_company(self, request, *args, **kwargs):
        return self.modify_company(request, *args, **kwargs)


    def patch(self, request, *args, **kwargs):
        # The JSONParser produces the same effect as below with cleaner code
        # And no need for a second JSON parsing or json.loads
        if CSRF_STATUS:
            return self.secure_modify_company(request, *args, **kwargs)
        else:
            return self.modify_company(request, *args, **kwargs)


    def delete_company(self, request, *args, **kwargs):
        if 'id' in kwargs:
            company_id = kwargs['id']
        delete_company = Company.objects.get(id=int(company_id))
        company_deleted_serialized = CompanySerializer(delete_company)
        delete_company.delete()
        return Response({
            "company": company_deleted_serialized.data
        })

    def secure_delete_company(self, request, *args, **kwargs):
        return self.delete_company(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        if CSRF_STATUS:
            return self.secure_delete_company(request, *args, **kwargs)
        else:
            return self.delete_company(request, *args, **kwargs)


class NewUser(APIView):
    def post(self, request, *args, **kwargs):
        new_user_data = JSONParser().parse(request)
        new_user = User(username=new_user_data["username"])
        new_user.set_password(new_user_data["password"])
        new_user.save()
        list_of_all_users = User.objects.all()
        return Response({
            "user": model_to_dict(new_user)
        })


@api_view(['POST'])
def user_login(request):
    login_data = JSONParser().parse(request)
    user_account = authenticate(username=login_data["username"], password=login_data["password"])
    if user_account is not None:
        user_token_object = UserToken()
        user_token_object.username = user_account.username
        user_token_object.save()
        user_jwt_token = jwt.encode(
            {
                'id': user_token_object.id,
                'username': user_account.username
            },
            settings.JWT_SECRET
        )
        user_token_object.jwt_token = user_jwt_token
        user_token_object.save()
        return Response({
            'user': user_account.username
        }, headers={
            'Authorization': user_jwt_token
        })
    else:
        return Response({
            'error': "Unauthorized"
        }, status=status.HTTP_401_UNAUTHORIZED)
