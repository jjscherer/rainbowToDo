from django.contrib import admin
from django.urls import include, path
from . import views

#router, required for rest framework (front end integration)
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'tasks', views.TodoView, 'task')

#you access the API as a part of the backend server
urlpatterns = [
    path('', views.todo, name='todo'),
    path('api/', include(router.urls))
]