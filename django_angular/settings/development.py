from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

MIDDLEWARE.remove('django.middleware.csrf.CsrfViewMiddleware')

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
