from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

from .models import TodoItem

def index(request):
    todo_list = TodoItem.objects.all()
    output = ''
    for t in todo_list:
        output += t.title + ' ' + str(t.status) + ' \n'

    return HttpResponse(output)