from django.shortcuts import render

# Create your views here.

def Market(request):
    return render(
        request,
        'market_page/market.html'
    )