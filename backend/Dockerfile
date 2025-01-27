# Use the official Python image as the base image
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Install additional dependencies for live updates
RUN pip install watchdog

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Start the Django application with live updates
CMD ["watchmedo", "auto-restart", "--patterns=*.py", "--recursive", "--", "python", "manage.py", "runserver", "0.0.0.0:8000"]