from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from .models import Project
from .serializers import ProjectSerializer
from PIL import Image
from io import BytesIO
import os
from django.conf import settings

class ProjectPagination(PageNumberPagination):
    page_size = 3

@api_view(['GET', 'POST'])
def project_list_create_view(request):
    # base_url = request.build_absolute_uri('/')[:-1]
    if request.method == 'GET':
        paginator = ProjectPagination()
        projects = Project.objects.all()
        result_page = paginator.paginate_queryset(projects, request)
        serializer = ProjectSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    elif request.method == 'POST':
        serializer = ProjectSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
        #Handle image processing
            image_data = request.data.get('images', False)
            if image_data:
                if isinstance(image_data, str):
                    image_data = image_data.encode('utf-8')
                image = Image.open(image_data)
                #Process image as needed e.g. resize, crop. etc
                buffer = BytesIO()
                format = image.format or 'JPEG'
                image.save(buffer, format=format)
                image_data = buffer.getvalue()
                # image_url = request.build_absolute_uri(settings.MEDIA_URL + str(image_data))[:255]
                # image_url = request.build_absolute_uri(image_data)[:255]
                # serializer.validated_data['images'] = image_url
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PATCH', 'DELETE'])
def project_detail_view(request, pk):
    try:
        project = Project.objects.get(pk=pk)
    except Project.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = ProjectSerializer(project)
        return Response(serializer.data)
    elif request.method == 'PATCH':
        serializer = ProjectSerializer(project, data=request.data, partial=True)
        if serializer.is_valid():
            # Handle image processing similar to POST method
            image_data = request.data.get('images')
            if image_data:
                image = Image.open(image_data)
                #Process image as needed
                buffer = BytesIO()
                format = image.format or 'JPEG'
                image.save(buffer, format=format)
                image_data = buffer.getvalue()
            #Delete old image file before saving the new one
            old_images_path = project.images.path if project.images else None
            old_video_path = project.video.path if project.video else None
            old_documentation_path = project.documentation.path if project.documentation else None

            if old_images_path and os.path.exists(old_images_path):
                os.remove(old_images_path)
            if old_video_path and os.path.exists(old_video_path):
                os.remove(old_video_path)
            if old_documentation_path and os.path.exists(old_documentation_path):
                os.remove(old_documentation_path)
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        # images_path = getattr(project.images, 'path', None)
        images_path = project.images.path if project.images else None
        video_path = project.video.path if project.video else None
        documentation_path = project.documentation.path if project.documentation else None
        #Delete associated files before deleting the project
        
        if images_path and os.path.exists(images_path):
            os.remove(images_path)
        
        if video_path and os.path.exists(video_path):
            os.remove(video_path)
        if documentation_path and os.path.exists(documentation_path):
            os.remove(documentation_path)
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

