from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.forms.models import model_to_dict
from django.views import View
from django.utils.decorators import method_decorator
from django.middleware.csrf import get_token
import json
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from .forms import CompanyForm, EmployeeForm
from .models import Company, Employee
from .serializers import CompanySerializer

# Create your views here.

class NewCompany(APIView):
    company_list = []
    def get(self, request, *args, **kwargs):
        get_token(request)
        # Checking the CSRF token that is added to the response object.
        # print(dir(request))
        # print(request.COOKIES)
        self.company_list = CompanySerializer(Company.objects.all(), many=True)
        return Response({
            "companies": self.company_list.data
        })

    def post(self, request, *args, **kwargs):
        # The JSONParser produces the same effect as below with cleaner code
        #new_company_data = json.loads(request.body.decode('utf-8'))
        new_company_data = JSONParser().parse(request)
        company_serializer = CompanySerializer(data=new_company_data)
        if company_serializer.is_valid():
            company_serializer.save()
        return Response({
            "company": company_serializer.data
        })

    def patch(self, request, *args, **kwargs):
        # The JSONParser produces the same effect as below with cleaner code
        # And no need for a second JSON parsing or json.loads
        changed_company_data = JSONParser().parse(request)
        print(changed_company_data)
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

    def delete(self, request, *args, **kwargs):
        if 'id' in kwargs:
            company_id = kwargs['id']
        delete_company = Company.objects.get(id=int(company_id))
        company_deleted_serialized = CompanySerializer(delete_company)
        delete_company.delete()
        return Response({
            "company": company_deleted_serialized.data
        })
