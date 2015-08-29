from django.shortcuts import render, render_to_response
from django.template import Context


def home_page(request):
    return render_to_response('home.html')
