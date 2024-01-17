from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = (
            "id",
            "project_name",
            "description",
            "start_date",
            "end_date",
            "get_image_url",
            "get_documentation_url",
            "get_video_url",
            "images",
            "documentation",
            "video",
            "duration",
            "date_created",
            )
