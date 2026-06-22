from django.http import HttpResponse
from django.shortcuts import render,redirect
from .models import Customer,Lead,FollowUp
from .forms import CustomerForm,LeadForm,FollowUpForm 
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from django.db.models import Q, Sum
from django.contrib import messages 
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .serializers import CustomerSerializer,LeadSerializer
from rest_framework import filters 

@login_required
def customer_list(request):
    customers = Customer.objects.all().order_by('-created_at')
    is_admin = request.user.is_superuser
    search_query = request.GET.get("search")

    if search_query:
        customers = customers.filter(
            Q(name__icontains=search_query) | Q (email__icontains=search_query) | Q(phone__icontains=search_query)
        )

    return render(request,"customer/customer_list.html",{"customers":customers,"is_admin":is_admin})

@login_required
def add_customer(request):
    form = CustomerForm()

    if request.method == "POST":
        form = CustomerForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request,"Customer added successfully")
            return redirect("customer-list")

    return render(request,"customer/add_customer.html",{"form":form})

@login_required
def customer_profile(request, pk):
    customer = Customer.objects.get(id=pk)
    leads = Lead.objects.filter(customer=customer)
    followups = FollowUp.objects.filter(lead__customer=customer)

    context = {
        'customer': customer,
        'leads': leads,
        'followups': followups
    }

    return render(request,'customer/customer_profile.html',context)
    
def update_customer(request,pk):
    customer = Customer.objects.get(id=pk)
    form = CustomerForm(instance=customer)

    if request.method == "POST":
        form = CustomerForm(request.POST,instance=customer)
        if form.is_valid():
            form.save()
            messages.success(request,"Customer updated successfully")
            return redirect("customer-list")

    return render(request,"customer/update_customer.html",{"form":form})

@login_required
def delete_customer(request,pk):
    customer = Customer.objects.get(id=pk)

    if request.method == "POST":
        customer.delete()
        messages.success(request,"Customer deleted successfully")
        return redirect("customer-list")

    return render(request,"customer/delete_customer.html",{"customer":customer})

@login_required
def dashboard(request):
    is_admin = request.user.is_superuser
    if is_admin:
        total_customers = Customer.objects.count()

        total_leads = Lead.objects.count()

        won_leads = Lead.objects.filter(status="Won").count()
        lost_leads = Lead.objects.filter(status="Lost").count()

        active_followups = FollowUp.objects.filter(
            completed=False
        ).count()

        potential_revenue = Lead.objects.aggregate(
            total=Sum('expected_value')
        )['total'] or 0
    
    else:
        total_customers = 0
        total_leads = Lead.objects.filter(assigned_to=request.user).count()
        won_leads = Lead.objects.filter(assigned_to=request.user,status="Won").count()
        lost_leads = Lead.objects.filter(assigned_to=request.user,status="Lost").count()

        active_followups = FollowUp.objects.filter(
            lead__assigned_to=request.user,
            completed=False
        ).count()

        potential_revenue = Lead.objects.filter(assigned_to=request.user).aggregate(
            total=Sum('expected_value')
        )['total'] or 0

    context = {
        "is_admin":is_admin,
        "total_customers":total_customers,
        "total_leads":total_leads,
        "won_leads":won_leads,
        "lost_leads":lost_leads,
        'active_followups':active_followups,
        'potential_revenue':potential_revenue,
    }

    return render(request,"dashboard/dashboard.html",context)

def register_view(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        password2 = request.POST['password2']

        if User.objects.filter(username=username).exists():
            messages.error(request,"Username Exists")
            return redirect('register')

        if password != password2:
            messages.error(request,"Password do not match")
            return redirect('register')

        User.objects.create_user(username=username,password=password)
        messages.success(request,"Registration Successfully")
        return redirect("login")

    return render(request,"register.html")

def login_view(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(request,username=username,password=password)
        if user is not None:
            login(request,user)
            return redirect("customer-list")

    return render(request,"login.html")

def logout_view(request):
    logout(request)
    return redirect("login")

@login_required
def lead_list(request):
    if request.user.is_superuser:
        leads = Lead.objects.all()
    else:
        leads = Lead.objects.filter(customer=request.user)
    is_admin = request.user.is_superuser
    return render(request,"lead/lead_list.html",{'leads':leads,"is_admin":is_admin})

@login_required
def add_lead(request):
    form = LeadForm()

    if request.method == "POST":
        form = LeadForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request,"Lead Created")
        return redirect("lead-list")

    return render(request,"lead/add_lead.html",{"form":form})

@login_required
def update_lead(request,pk):
    lead = Lead.objects.get(id=pk)
    form = LeadForm(instance=lead)

    if request.method == "POST":
        form = LeadForm(request.POST,instance=lead)
        if form.is_valid():
            form.save()
            return redirect("lead-list")

    return render(request,"lead/update_lead.html",{"form":form})

@login_required
def delete_lead(request,pk):
    lead = Lead.objects.get(id=pk)

    if request.method == "POST":
        lead.delete()
        return redirect("lead-list")

    return render(request,"lead/delete_lead.html",{"lead":lead})

@login_required
def add_followup(request):
    form = FollowUpForm()

    if request.method == "POST":
        form = FollowUpForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request,"Followup Added")
            return redirect("lead-list")

    return render(request,"followup/add_followup.html",{"form":form})

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_class = [IsAuthenticated]

    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter
    ]

    search_fields = [
        "name","email","phone"
    ]
    
    ordering_fields = [
        "name","created_at"
    ]

class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_class = [IsAuthenticated]