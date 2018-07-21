from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.forms.models import model_to_dict

from .forms import CompanyForm, EmployeeForm
from .models import Company, Employee, SomeModel
from .serializers import SomeModelSerializer

# Create your views here.

def new_company(request):
    # new_form = CompanyForm()
    # new_object = Company()
    # new_object_as_dict = model_to_dict(new_object)
    # del new_object_as_dict['id']
    # new_somemodel = SomeModelSerializer()
    # print(new_somemodel)
    # print()
    # print(new_somemodel.serializer_field_mapping)
    # print()
    # print(dir(new_somemodel))
    # return HttpResponse(new_somemodel)
    return HttpResponse("Hello World")
