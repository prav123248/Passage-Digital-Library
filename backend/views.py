from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from . import views
from django.urls import reverse
from django.template import loader

def index(request):
    return render(request, 'index.html')

