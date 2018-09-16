from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.forms.models import model_to_dict
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json

from .forms import CompanyForm, EmployeeForm
from .models import Company, Employee
from .serializers import CompanySerializer

# Create your views here.

class NewCompany(View):
    company_list = []
    def get(self, request, *args, **kwargs):
        self.company_list = CompanySerializer(Company.objects.all(), many=True)
        return JsonResponse({
            "companies": self.company_list.data
        })

    def post(self, request, *args, **kwargs):
        new_company_data = json.loads(request.body.decode('utf-8'))
        new_company = Company(**new_company_data)
        new_company.save()
        return JsonResponse({
            "company": model_to_dict(new_company)
        })

    def patch(self, request, *args, **kwargs):
        changed_company_data = json.loads(request.body.decode('utf-8'))
        changed_company = Company.objects.get(id=int(changed_company_data['companyId']))
        changed_company_form = json.loads(changed_company_data['companyForm'])
        for company_attr, company_val in changed_company_form.items():
            setattr(changed_company, company_attr, company_val)
        changed_company.save()
        return JsonResponse({
            "company": model_to_dict(changed_company)
        })

    def delete(self, request, *args, **kwargs):
        if 'id' in kwargs:
            company_id = kwargs['id']
        delete_company = Company.objects.get(id=int(company_id))
        company_deleted = model_to_dict(delete_company)
        delete_company.delete()
        return JsonResponse({
            "company": company_deleted
        })
