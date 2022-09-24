from .models import Book, Read
from rest_framework import serializers

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model= Book
        fields = ('id','name', 'genre', 'author', 'coverPath', 'publishedDate','pageCount','finished')


class ReadSerializer(serializers.ModelSerializer):
    bookID = BookSerializer()
    class Meta:
        model= Read
        fields = ('id','bookID','dateFinished')


    
