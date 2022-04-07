from django.shortcuts import render

# Create your views here.

def Prod(request):
    return render(
        request,
        'main_page/base.html'
    )