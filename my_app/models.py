from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Company(models.Model):
    user_manager = models.IntegerField()
    name = models.CharField(default='Google', max_length=200)
    headquarters = models.CharField(default='San Jose, California', max_length=200)
    address = models.CharField(default='123 River Drive, San Jose, California', \
                max_length=500, blank=True, null=True)
    company_website = models.URLField(default='http://www.google.com', \
                blank=True, null=True)
    established_year = models.IntegerField(default=2000, blank=True, null=True)
    visibility = models.CharField(max_length=7, choices=(
                    ('Public', 'Public'),
                    ('Private', 'Private')
                ), default='Private')

    def __str__(self):
        return str(self.name) + " in " + str(self.headquarters)

    def __unicode__(self):
        return str(self.name) + " in " + str(self.headquarters)


class UserToken(models.Model):
    username = models.CharField(max_length=100)
    jwt_token = models.CharField(max_length=500, blank=True, null=True)

    def __str__(self):
        return str(self.username)

    def __unicode__(self):
        return str(self.username)


class Employee(models.Model):
    first_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    address = models.CharField(max_length=500)

    def __str__(self):
        return "Mr. " + self.last_name + " from " + str(self.company.name)

    def __unicode__(self):
        return "Mr. " + self.last_name + " from " + str(self.company.name)
