from django.urls import path 
from . import views 

urlpatterns = [
    path('',views.register_view,name="register"),
    path('login/',views.login_view,name="login"),
    path('logout/',views.logout_view,name="logout"),
    path('customers/list/',views.customer_list,name="customer-list"),
    path('customer/add/',views.add_customer,name="add-customer"),
    path('customer/<int:pk>/',views.customer_profile,name='customer-profile'),
    path('customer/update/<int:pk>/',views.update_customer,name="update-customer"),
    path('customer/delete/<int:pk>/',views.delete_customer,name="delete-customer"),
    path('dashboard/',views.dashboard,name="dashboard"),
    path('leads/',views.lead_list,name="lead-list"),
    path('lead/add/',views.add_lead,name="add-lead"),
    path('lead/update/<int:pk>/',views.update_lead,name="update-lead"),
    path('lead/delete/<int:pk>',views.delete_lead,name="delete-lead"),
    path('followup/add/',views.add_followup,name="add-followup"),
]
