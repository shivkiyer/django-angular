"""django_angular URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from django.contrib.staticfiles.views import serve
from django.views.generic import RedirectView
from my_app import views

urlpatterns = [
    re_path(r'^$', serve, kwargs={'path': 'index.html'}, name="index"),
    path('admin/', admin.site.urls),
    path('api/new-company/<int:id>/', views.NewCompany.as_view(), name='delete_company'),
    re_path(r'^api/new-company/$', views.NewCompany.as_view(), name='new_company'),
    path('api/user/', views.NewUser.as_view(), name='new_user'),
    path('api/user/login/', views.user_login, name='login_user'),
    path('api/', views.home_page, name='home_page'),

    # Serving static JS files in Angular
    re_path(r'^(?!/?static/)(?!/?media/)(?P<path>.*\..*)$', \
            RedirectView.as_view(url='/static/%(path)s', permanent=False)),
]
