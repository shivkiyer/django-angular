from django.forms import models
from .models import Company, Employee

class CompanyForm(models.ModelForm):
    class Meta:
        model = Company
        fields = [
            'name',
            'headquarters',
            'address',
            'company_website',
            'established_year'
        ]

class EmployeeForm(models.ModelForm):
    class Meta:
        model = Employee
        fields = [
            'first_name',
            'last_name',
            'email',
            'company',
            'address'
        ]
