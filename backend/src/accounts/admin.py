from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from accounts.models import Account

class AccountAdmin(UserAdmin):
    model = Account
    list_display = ('email', 'name', 'is_active', 'is_staff', 'is_superuser', 'date_joined', 'last_login')
    list_filter = ('is_active', 'is_staff', 'is_superuser')
    search_fields = ('email', 'name')
    ordering = ('-date_joined',)

    # Fields for the detail page (add and change views)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name',)}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined',)}),
    )

    # Fields for creating a user or superuser
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'name', 'is_active', 'is_staff', 'is_superuser')
        }),
    )

    readonly_fields = ('date_joined', 'last_login')

    # Customize how the user is displayed in the admin panel (for the list view)
    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset

# Register the admin configuration with the model
admin.site.register(Account, AccountAdmin)
