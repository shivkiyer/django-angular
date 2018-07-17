from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.forms.models import model_to_dict

from .forms import CompanyForm, EmployeeForm
from .models import Company, Employee

# Create your views here.

def new_company(request):
    new_form = CompanyForm()
    print(new_form.as_ul())
    new_object = Company()
    new_object_as_dict = model_to_dict(new_object)
    del new_object_as_dict['id']
    print(new_object_as_dict)
    return JsonResponse({'form': new_object_as_dict})
    # return HttpResponse(new_form.as_p())
