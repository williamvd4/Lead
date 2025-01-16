# Stage 1: Build the Vite frontend
FROM node:20-alpine as frontend-builder

WORKDIR /app

# Copy the frontend source code
COPY project/package.json project/yarn.lock ./
COPY project/ ./

# Install dependencies and build the frontend
RUN yarn install --frozen-lockfile
RUN yarn build

# Stage 2: Set up the Django backend
FROM python:3.12-slim as backend

WORKDIR /app

# Install Python dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend source code
COPY backend/ ./

# Copy the built frontend files to the Django static directory
COPY --from=frontend-builder /app/dist/ /app/static/

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose the port the app runs on
EXPOSE 8000

# Start the Django application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]