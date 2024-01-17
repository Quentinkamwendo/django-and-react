from django.db import models
from django.core.exceptions import ValidationError
from django.conf import settings
from django.urls import reverse
import uuid
# from datetime import date

class Project(models.Model):
    id = models.UUIDField(primary_key=True, auto_created=True, serialize=False, default=uuid.uuid4)
    project_name = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    images = models.ImageField(upload_to='project_image', null=True, blank=True)
    documentation = models.FileField(upload_to='documentation', null=True, blank=True)
    video = models.FileField(upload_to='project_videos', null=True, blank=True)
    duration = models.CharField(max_length=50, editable=False)
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-date_created',)

    def clean_fields(self, exclude=None):
        super().clean_fields(exclude=exclude)

        if self.end_date and self.start_date:
            if self.end_date <= self.start_date:
                raise ValidationError({'end_date': 'End date must be after start date'})

    def save(self, *args, **kwargs):
        if self.start_date and self.end_date:
            self.duration = str(self.end_date - self.start_date)
        super().save(*args, **kwargs)

    @property
    def get_image_url(self) -> str:
        if self.images and hasattr(self.images, 'url'):
            return f"http://127.0.0.1:8000{self.images.url}"

    @property
    def get_documentation_url(self) -> str:
        if self.documentation and hasattr(self.documentation, 'url'):
            return f"http://127.0.0.1:8000{self.documentation.url}"

    @property
    def get_video_url(self) -> str:
        if self.video and hasattr(self.video, 'url'):
            return f"http://127.0.0.1:8000{self.video.url}"



