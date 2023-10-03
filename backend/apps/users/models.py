from django.db import models
from django.utils import timezone
from multiselectfield import MultiSelectField
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from .managers import CustomUserManager


SPECIALIZATIONS = (
    ("Gamedesign", "Gamedesign"),
    ("Fullstack", "Fullstack"),
    ("Frontend", "Frontend"),
    ("Backend", "Backend"),
    ("Gamedev", "Gamedev"),
    ("UX/UI", "UX/UI"),
    ("NLP", "NLP"),
    ("ML", "ML"),
    ("CV", "CV"),
)

SKILLS = (
    ("Python", "Python"),
    ("Kotlin", "Kotlin"),
    ("Golang", "Golang"),
    ("Swift", "Swift"),
    ("Ruby", "Ruby"),
    ("Rust", "Rust"),
    ("Java", "Java"),
    ("SQL", "SQL"),
    ("C++", "C++"),
    ("PHP", "PHP"),
    ("C#", "C#"),
    ("1C", "1C"),
    ("JS", "JS"),
    ("TS", "TS"),
    ("C", "C"),


    ("Angular", "Angular"),
    ("Laravel", "Laravel"),
    ("FastAPI", "FastAPI"),
    ("Django", "Django"),
    ("React", "React"),
    ("Next", "Next"),
    (".NET", ".NET"),
    ("Vue", "Vue"),
    ("Yii", "Yii"),
)

# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=50, unique=True, null=True)
    fullname = models.CharField(max_length=100, null=True)
    about = models.TextField(null=True)
    birth_date = models.DateField(null=True)
    specialty = MultiSelectField(choices=SPECIALIZATIONS, max_length=10, null=True)
    skills = MultiSelectField(choices=SKILLS, max_length=10, null=True)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["fullname", "about", "birth_date", "specialty", "skills"]

    objects = CustomUserManager()

    def __str__(self): return self.username
