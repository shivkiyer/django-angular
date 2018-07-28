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
@method_decorator(csrf_exempt, name='post')
class NewCompany(View):
    def get(self, request):
        return JsonResponse({"message": "Hello world"})

    def post(self, request):
        new_company_data = json.loads(request.body.decode('utf-8'))
        new_company = Company(**new_company_data)
        new_company.save()
        return HttpResponse("Done");
