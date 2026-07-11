from django.db import models
from django.contrib.auth.models import User

class Customer(models.Model):
    STATUS = [
        ('Active','Active'),
        ('Inactive','Inactive'),
    ]
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    company = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    status = models.CharField(max_length=20,choices=STATUS,default='Active')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class Lead(models.Model):
    STATUS_CHOICES = [
        ('New','New'),
        ('Contacted','Contacted'),
        ('Qualified','Qualified'),
        ('Proposal','Proposal Sent'),
        ('Won','Won'),
        ('Lost','Lost'),
    ]
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL,null=True,blank=True)
    status = models.CharField(max_length=20,choices=STATUS_CHOICES,default='New')
    expected_value = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer.name} - {self.status}"

class FollowUp(models.Model):
    lead = models.ForeignKey(Lead,on_delete=models.CASCADE)
    Followup_date = models.DateField()
    notes = models.TextField()
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.lead.customer.name}"
    
