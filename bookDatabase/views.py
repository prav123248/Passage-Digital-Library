from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from . import views
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.template import loader
from .models import Book, Read
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import BookSerializer, ReadSerializer

def index(request):
    return render(request, 'index.html')


class toReadViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.filter(finished=False)
    serializer_class = BookSerializer

class ReadViewSet(viewsets.ModelViewSet):
    queryset = Read.objects.all().prefetch_related('bookID')
    serializer_class = ReadSerializer    



@csrf_exempt
def addBook(request):
    title = request.POST['title']
    author = request.POST['author']
    genre = request.POST['genre']
    pageCount = request.POST['pagecount']
    published = request.POST['published']
    finish = False
    cover="paths"
    bookRecord = Book(name=title, genre=genre, author=author, pageCount=pageCount, publishedDate=published, finished=finish, coverPath=cover)
    bookRecord.save()
    return HttpResponseRedirect(reverse('index'))

