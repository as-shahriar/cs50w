
from django.urls import path

from . import views

urlpatterns = [
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path('', views.allPost, name="allposts"),
    path('u/<username>', views.profile, name="profile"),
    path('following/', views.following, name="following"),
    path('like/', views.like),
    path('follow/', views.follow),
    path('edit_post/', views.edit_post),
    path('addpost/', views.addpost),
]
