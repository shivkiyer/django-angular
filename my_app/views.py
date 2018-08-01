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

@method_decorator(csrf_exempt, name='dispatch')
class NewCompany(View):
    def get(self, request):
        company_list = CompanySerializer(Company.objects.all(), many=True)
        return JsonResponse({
            "message": "Hello world",
            "companies": company_list.data
        })

    def post(self, request):
        new_company_data = json.loads(request.body.decode('utf-8'))
        new_company = Company(**new_company_data)
        new_company.save()
        return HttpResponse("Done");

    def patch(self, request):
        changed_company_data = json.loads(request.body.decode('utf-8'))
        changed_company = Company.objects.get(id=int(changed_company_data['companyId']));
        changed_company_form = json.loads(changed_company_data['companyForm'])
        for company_attr, company_val in changed_company_form.items():
            setattr(changed_company, company_attr, company_val)
        changed_company.save()
        return HttpResponse("Done");
