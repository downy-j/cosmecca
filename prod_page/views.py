from django.shortcuts import render

# Create your views here.

def Prod(request):
    return render(
        request,
        'prod_page/prod_search.html'
    )