from rest_framework import serializers
from my_app.models import SomeModel

class SomeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = SomeModel
        fields = ('a', 'b', 'c')
