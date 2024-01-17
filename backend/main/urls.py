from django.urls import path
# from rest_framework import routers
from .views import register_user, login_user, logout_user

# router = routers.DefaultRouter()
# router.register(r'register', register_user)
# router.register(r'login', login_user)
# router.register(r'logout', logout_user)

# urlpatterns = router.urls

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),
]
