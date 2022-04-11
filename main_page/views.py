from django.shortcuts import render

# Create your views here.

def Main(request):
    return render(
        request,
        'main_page/base.html'
    )
    
def Login(request):
    return render(
        request,
        'main_page/login.html'
    )