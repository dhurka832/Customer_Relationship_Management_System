from rest_framework import serializers
from .models import Customer, Lead 

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Customer
        fields = "__all__"

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = "__all__"