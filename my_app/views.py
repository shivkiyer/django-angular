from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.forms.models import model_to_dict
from django.views import View
from django.utils.decorators import method_decorator
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_protect, csrf_exempt
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


@api_view(['GET'])
def home_page(request, *args, **kwargs):
    get_token(request)
    return Response({
        "message": "received"
    })


def extract_user_info(request):
    if not request.META.get('HTTP_AUTHORIZATION'):
        return None
    user_info = jwt.decode(
        request.META.get('HTTP_AUTHORIZATION'),
        settings.JWT_SECRET
    )
    return user_info


@method_decorator(csrf_protect, name='secure_create_company')
@method_decorator(csrf_protect, name='secure_modify_company')
@method_decorator(csrf_protect, name='secure_delete_company')
class NewCompany(APIView):
    company_list = []
    def get(self, request, *args, **kwargs):
        get_token(request)
        user_info = extract_user_info(request)
        try:
            user_object = User.objects.get(username=user_info['username'])
            fetched_companies_list = Company.objects.filter(user_manager=user_object.id)
        except:
            fetched_companies_list = []
        remaining_companies_list = Company.objects.exclude(user_manager=user_object.id).filter(visibility='Public')
        for rem_items in remaining_companies_list:
            print(rem_items, rem_items.visibility)
        print(remaining_companies_list)
        total_company_list = fetched_companies_list | remaining_companies_list
        # The next line is for test purposes.
        # To check if companies created by other users
        # can be modified or deleted.
        # fetched_companies_list = Company.objects.all()
        self.company_list = CompanySerializer(total_company_list, many=True)
        return Response({
            "companies": self.company_list.data
        })

    def create_company(self, request, *args, **kwargs):
        user_info = extract_user_info(request)
        try:
            user_object = User.objects.get(username=user_info['username'])
        except:
            return Response({
                'message': 'User not logged in.'
            }, status=status.HTTP_401_UNAUTHORIZED)
        new_company_data = JSONParser().parse(request)
        new_company_data['user_manager'] = user_object.id
        company_serializer = CompanySerializer(data=new_company_data)
        if company_serializer.is_valid():
            company_serializer.save()
        else:
            return Response({
                'message': 'There was an error in saving the company.',
                'errors': company_serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
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
        user_info = extract_user_info(request)
        try:
            user_object = User.objects.get(username=user_info['username'])
        except:
            return Response({
                'message': 'User not logged in.'
            }, status=status.HTTP_401_UNAUTHORIZED)
        changed_company_data = JSONParser().parse(request)
        changed_company = Company.objects.get(id=int(changed_company_data['companyId']))
        if not changed_company.user_manager==user_object.id:
            return Response({
                'message': 'You cannot modify this data.'
            }, status=status.HTTP_401_UNAUTHORIZED)
        changed_company_data['companyForm']['user_manager'] = changed_company.user_manager
        changed_company_serializer = CompanySerializer(
                        changed_company,
                        data=changed_company_data['companyForm']
                    )
        if changed_company_serializer.is_valid():
            changed_company_serializer.save()
        else:
            return Response({
                'message': 'There was an error in modifying.',
                'errors': changed_company_serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
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
        user_info = extract_user_info(request)
        try:
            user_object = User.objects.get(username=user_info['username'])
        except:
            return Response({
                'message': 'User not logged in.'
            }, status=status.HTTP_401_UNAUTHORIZED)
        if 'id' in kwargs:
            company_id = kwargs['id']
        delete_company = Company.objects.get(id=int(company_id))
        if not delete_company.user_manager==user_object.id:
            return Response({
                'message': 'You cannot delete this item.'
            }, status=status.HTTP_401_UNAUTHORIZED)
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


@method_decorator(csrf_protect, name="secure_create_user")
class NewUser(APIView):
    def create_user(self, request, *args, **kwargs):
        new_user_data = JSONParser().parse(request)
        new_user = User(username=new_user_data["username"])
        new_user.set_password(new_user_data["password"])
        try:
            new_user.save()
        except:
            return Response({
                'message': 'Registration failed.'
            }, status=status.HTTP_400_BAD_REQUEST)
        return Response({
            "user": {
                "username": new_user.username
            }
        })

    def secure_create_user(self, request, *args, **kwargs):
        return self.create_user(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        if CSRF_STATUS:
            return self.secure_create_user(request, *args, **kwargs)
        else:
            return self.create_user(request, *args, **kwargs)



def login_portal(request):
    login_data = JSONParser().parse(request)
    user_account = authenticate(
        username=login_data["username"],
        password=login_data["password"]
    )
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
            'message': "User login/password incorrect."
        }, status=status.HTTP_401_UNAUTHORIZED)


@csrf_protect
def secure_login_portal(request):
    return login_portal(request)


@api_view(['POST'])
def user_login(request):
    if CSRF_STATUS:
        return secure_login_portal(request)
    else:
        return login_portal(request)


@api_view(['POST'])
def user_logout(request):
    user_info = extract_user_info(request)
    user_object = UserToken.objects.get(id=int(user_info['id']))
    user_object.delete()
    return Response({
        'message': 'Logged out'
    })
