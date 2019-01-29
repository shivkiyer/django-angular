from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

#MIDDLEWARE.remove('django.middleware.csrf.CsrfViewMiddleware')

# CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = (
    'localhost:4200',
)
CORS_ALLOW_CREDENTIALS = True

# CORS_ALLOW_HEADERS = (
#     'accept',
#     'accept-encoding',
#     'authorization',
#     'content-type',
#     'dnt',
#     'origin',
#     'user-agent',
#     'x-csrftoken',
#     'x-requested-with',
# )
#
# CORS_EXPOSE_HEADERS = (
#     'accept',
#     'accept-encoding',
#     'authorization',
#     'content-type',
#     'dnt',
#     'origin',
#     'user-agent',
#     'x-csrftoken',
#     'x-requested-with',
# )
