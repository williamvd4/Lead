# Use the official Node.js image as the base image
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package.json package-lock.json* ./

# Install the application dependencies
RUN npm install

# Install additional dependencies for live updates
RUN npm install -g nodemon

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on (Vite typically uses port 5173)
EXPOSE 5173

# Define the command to run the application with nodemon for live updates
CMD ["npx", "nodemon", "-L", "--exec", "npm run dev"]