from django.urls import path
from rest_framework import routers
from .views import project_detail_view, project_list_create_view

router = routers.DefaultRouter()
# router.register(r'projects/', project_list_create_view, basename='project')
# router.register(r'projects/<pk:pk>/', project_detail_view, basename='detail')

# urlpatterns = router.urls
urlpatterns = [
    path('projects/', project_list_create_view, name='project-list-create'),
    path('projects/<str:pk>/', project_detail_view, name='project-detail'),
]