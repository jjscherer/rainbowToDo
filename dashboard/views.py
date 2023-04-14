from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import TodoItem

def index(request):
    return HttpResponse("This is the index page. Go to /todo to get a list of")

def todo(request):
    todo_list = TodoItem.objects.all()
    output = ''
    for t in todo_list:
        output += t.title + ' ' + str(t.status) + ' \n'

    return HttpResponse(output)

class TodoView(viewsets.ModelViewSet):

    serializer_class = TodoSerializer
    queryset = TodoItem.objects.all()