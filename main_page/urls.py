from django.urls import path
from . import views
# from django.contrib.auth import views as auth_views

# app_name = 'main_page'

urlpatterns =[
    path('', views.LogIn, name='login_page'),
]

# urlpatterns =[
#     path('', 
#          auth_views.LogIn.as_view(template_name='main_page/login.html'), 
#          name='login_page'),
# ]