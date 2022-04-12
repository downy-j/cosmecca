import imp
from django.shortcuts import redirect, render
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from django.contrib import auth
# Create your views here.
    
def LogIn(request):
    if request.method == 'GET':
        print(request.user)
        return render(request, 'main_page/login.html')
    
    elif request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            # Redirect to a success page
            return HttpResponseRedirect(reverse('prod_page:prod_search'))
        else:
            #  Return an 'invalid login' error message.
            return render(request, 'main_page/login.html')

def LogOut(request):
    if request.method == 'POST':
        auth.logout(request)
        redirect('login')
    return logout(request, 'main_page/login.html')