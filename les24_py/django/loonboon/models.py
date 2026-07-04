from django.db import models

# Create your models here.
class Owner(models.Model):
    full_name = models.CharField(max_length=70)

    def __str__(self):
        return self.full_name

class Cat(models.Model):
    birthday = models.DateField()
    name = models.CharField(max_length=70)
    description = models.TextField()
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    def __str__(self):
        return self.name