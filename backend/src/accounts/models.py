from django.db import models, migrations
from django.contrib.auth.models import Group
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin,
)
from django.db.models import JSONField
from django.core.validators import RegexValidator

# for login this is needed
# {
#     "email": "john@gmail.com",
#     "lastName": "Smith",
#     "location": "Kiev",
#     "name": "John",
#     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjU5ZWMwNmJlZWEzMWZjMTRiZGI4YTYiLCJuYW1lIjoiSm9obiIsImlhdCI6MTc0Mzc3MTk0NSwiZXhwIjoxNzQzODU4MzQ1fQ._tR_eJN1xig0WBQ1S81qvKET1cNlGUVFEZxjdiObJcs"
# }

# register success response
# {
#     "email": "tesuSEr@gmail.com",
#     "lastName": "lastName",
#     "location": "my city",
#     "name": "testUser",
#     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2VmZGEzODZjZGIyY2VlZTk2ODI2ODMiLCJuYW1lIjoidGVzdFVzZXIiLCJpYXQiOjE3NDM3NzIyMTcsImV4cCI6MTc0Mzg1ODYxN30.5QkjysT1ykRwtNEJXW9SGrppS8e16yddRQ0zr5sY2fY"
# }

class MyAccountManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address!")

        email = self.normalize_email(email)

        user = self.model(
            email=email,
            **extra_fields,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staff(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Staff must have an email address!")

        email = self.normalize_email(email)

        user = self.create_user(
            email=email,
            **extra_fields,
        )
        user.is_staff = True
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            **extra_fields,
        )

        user.is_active = True
        user.is_staff = True
        user.is_superuser = True

        user.save(using=self._db)

        return user


class Account(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=50, verbose_name="Name")
    email = models.EmailField(max_length=60, unique=True, verbose_name="Email",)
    last_name = models.CharField(max_length=50, verbose_name="Lastname", default='lastName')
    location = models.CharField(max_length=50, verbose_name="Location", default='my city')
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    date_joined = models.DateTimeField(verbose_name="date joined", auto_now_add=True)
    last_login = models.DateTimeField(verbose_name="last login", auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    objects = MyAccountManager()

    def __str__(self):
        return self.email

    class Meta:
        verbose_name_plural = 'Accounts'