from django import forms 
from .models import Customer,Lead,FollowUp

class CustomerForm(forms.ModelForm):
    class Meta:
        model = Customer 
        fields = "__all__"

class LeadForm(forms.ModelForm):
    class Meta:
        model = Lead 
        fields = "__all__"

class FollowUpForm(forms.ModelForm):
    class Meta:
        model = FollowUp
        fields ="__all__"

    