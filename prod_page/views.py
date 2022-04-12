from django.shortcuts import render

# Create your views here.

def Prod(request):
    return render(
        request,
        'prod_page/prod_search.html'
    )

def Detail(request):
    return render(
        request,
        'prod_page/prod_detail.html'
    )

def Comparison(request):
    return render(
        request,
        'prod_page/prod_detail.html'
    )