from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS.extend(IP_ADDRESS_LIST)
ALLOWED_HOSTS.extend(HOSTNAME_LIST)

INSTALLED_APPS.remove('corsheaders')
