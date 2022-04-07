from django.shortcuts import render

# Create your views here.
def Trend(request):
    return render(
        request,
        'trend_page/trend-analysis.html'
    )