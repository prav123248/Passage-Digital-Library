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
        read = Book.objects.exclude(dateFinished__isnull = True)
        serializer = self.get_serializer(read,many=True)
        return Response(serializer.data)
    
@csrf_exempt
def addBook(request):
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
    
    bookRecord = Book(name=title, genre=genre, author=author, pageCount=pageCount, publishedDate=published, finished=finish, coverPath=uniqueCoverID, dateFinished=None)
    bookRecord.save()
    return HttpResponseRedirect(reverse('index'))


@csrf_exempt
def delete(request, id):
    record = Book.objects.get(id=id)
    record.delete()
    return HttpResponseRedirect(reverse('index'))

@csrf_exempt
def mark(request):
    title = request.POST["markDropdown"]
    rec = Book.objects.filter(name=title)
    rec = rec[0]
    rec.finished = True
    rec.save()
    calendar = request.POST['markCalendar']
    year = calendar[0:4]
    month = calendar[5:7]
    day = calendar[8:]
    readRecord = Read(dateFinished=year + "-" + month + "-" + day + " 00:00", bookID=rec)
    readRecord.save()
    return HttpResponseRedirect(reverse('index'))














