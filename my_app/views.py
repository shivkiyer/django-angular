from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.forms.models import model_to_dict
from django.views import View

from .forms import CompanyForm, EmployeeForm
from .models import Company, Employee, SomeModel
from .serializers import SomeModelSerializer

# Create your views here.

class NewCompany(View):
    def get(self, request):
        # return HttpResponse('Hello world')
        return JsonResponse({"message": "Hello world"})
