from django.contrib.auth import get_user_model

User = get_user_model()

# Check if a superuser already exists
if not User.objects.filter(is_superuser=True).exists():
    User.objects.create_superuser(
        username="admin",  # Replace with your desired username
        email="williamvd4@gmail.com",  # Replace with your desired email
        password="password"  # Replace with your desired password
    )
    print("Superuser created successfully.")
else:
    print("Superuser already exists.")
