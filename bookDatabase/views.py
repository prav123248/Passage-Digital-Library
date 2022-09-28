from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from . import views
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.template import loader
from .models import Book
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import BookSerializer
import urllib.request
from os import remove
from os.path import exists

def index(request):
    return render(request, 'index.html')


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    @action(methods=['get'],detail=False)
    def toRead(self, request):
        unread = Book.objects.exclude(dateFinished__isnull = False)
        serializer = self.get_serializer(unread,many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=False)
    def read(self,request):
        read = Book.objects.exclude(dateFinished__isnull = True).order_by('-dateFinished')
        serializer = self.get_serializer(read,many=True)
        return Response(serializer.data)

def returnValidTime(date):
    year = date[0:4]
    month = date[5:7]
    day = date[8:]
    return year + "-" + month + "-" + day + " 00:00"    

 
@csrf_exempt
def add(request):
    title = request.POST['title']
    author = request.POST['author']
    genre = request.POST['genre']
    pageCount = request.POST['pagecount']
    published = request.POST['published']
    coverURL=request.POST['coverPath']
    uniqueCoverID = coverURL.split("id/")[1]
    coverFileName = "media/Covers/" + uniqueCoverID

    image = (urllib.request.urlopen(coverURL)).read()
    with open(coverFileName, "wb") as file:
        file.write(image)
        file.close()
    
    bookRecord = Book(name=title, genre=genre, author=author, pageCount=pageCount, publishedDate=published, coverPath=uniqueCoverID, dateFinished=None)
    bookRecord.save()
    return HttpResponseRedirect(reverse('index'))

@csrf_exempt
def update(request):
    bookID = request.POST['updateID']
    title = request.POST['updateTitle']
    author = request.POST['updateAuthor']
    genre = request.POST['updateGenre']
    pageCount = request.POST['updatePageCount']
    published = request.POST['updatePublished']
    dateFinished = request.POST['updateDateFinished']

    bookRecord = Book.objects.get(id=bookID)
    bookRecord.name = title
    bookRecord.author = author
    bookRecord.genre = genre
    bookRecord.pageCount = pageCount
    bookRecord.publishedDate = published

    if bookRecord.dateFinished != None:
        bookRecord.dateFinished = returnValidTime(dateFinished)
        
    bookRecord.save()

    print(bookRecord)
    return HttpResponseRedirect(reverse('index'))



@csrf_exempt
def delete(request):
    bookName = request.POST['removeSelection']
    record = Book.objects.filter(name=bookName)[0]
    cover = "media/Covers/" + record.coverPath
    if exists(cover):
        remove(cover)
    record.delete()
    return HttpResponseRedirect(reverse('index'))

@csrf_exempt
def mark(request):
    title = request.POST["markDropdown"]
    rec = Book.objects.filter(name=title)[0]
    date = request.POST['markCalendar']
    rec.dateFinished = returnValidTime(date)
    rec.save()
    return HttpResponseRedirect(reverse('index'))














