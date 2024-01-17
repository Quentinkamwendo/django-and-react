# Generated by Django 4.2.6 on 2023-12-16 06:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('project_name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('images', models.ImageField(blank=True, null=True, upload_to='project_image')),
                ('documentation', models.FileField(blank=True, null=True, upload_to='documentation')),
                ('video', models.FileField(blank=True, null=True, upload_to='project_videos')),
                ('duration', models.CharField(editable=False, max_length=50)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ('-date_created',),
            },
        ),
    ]
