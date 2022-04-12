from unicodedata import name
from django.urls import path
from . import views

app_name = 'prod_page'

urlpatterns =[
    path('', views.Prod, name='prod_search'),
    path('prod-detail/', views.Detail),
    path('comparison/', views.Comparison),
]