from django.db import models

# Create your models here.
class TodoItem(models.Model):
    title = models.CharField(max_length=200)
    status = models.IntegerField(default=0)
    date = models.DateTimeField()
    def __str__(self):
        return self.title