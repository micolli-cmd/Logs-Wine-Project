from django.urls import path
from . import views

urlpatterns = [
    path('', views.age_gate, name='age_gate'),
    path('home/', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('wines/', views.wines, name='wines'),
    path('events/', views.events, name='events'),
    path('recipe/', views.recipe, name='recipe'),
    path('contact/', views.contact, name='contact'),
    path('shop/', views.shop, name='shop'),
]