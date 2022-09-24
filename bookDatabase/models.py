from django.db import models

class Book(models.Model):
    name = models.CharField(max_length=255)
    genre = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    coverPath = models.CharField(max_length=255)
    publishedDate = models.CharField(max_length=255)
    pageCount = models.CharField(max_length=255)
    finished = models.BooleanField()

    def __str__(self):
        return (str(self.id) + "," + self.name + "," + self.genre + "," + self.author + "," + self.coverPath + "," + self.publishedDate + "," + self.pageCount)

class Read(models.Model):
    dateFinished = models.DateTimeField()
    bookID = models.ForeignKey(Book, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id)

