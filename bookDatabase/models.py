from django.db import models

class Book(models.Model):
    name = models.CharField(max_length=255)
    genre = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    coverPath = models.CharField(max_length=255)
    publishedDate = models.CharField(max_length=255)
    pageCount = models.CharField(max_length=255)
    dateFinished = models.DateTimeField(default=None, blank=True, null=True)

    def __str__(self):
        if (self.dateFinished):
            date = str(self.dateFinished)
        else:
            date = "None"
        return (str(self.id) + "," + self.name + "," + self.genre + "," + self.author + "," + self.coverPath + "," + self.publishedDate + "," + self.pageCount + "," + date)
