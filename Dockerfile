# Use the latest Node.js 20 image from Docker Hub as the base image
FROM node:20

# Install SQLite3 (using apt-get if the base image is Debian/Ubuntu-based)
RUN apt-get update && apt-get install -y sqlite3

# Update npm to version 9.0.0
RUN npm install -g npm@9.0.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files from the current directory to the container's working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["node", "app.js"]
