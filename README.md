This is similar to project or repository: https://github.com/ckaltenbach904/my_web_project. Only this time, you would use containerize technology such as Docker. And the app this time will be written in node.js with npm and SQLite.

This is the link to the web app which was deploy to netlify just to handle the front end and no backend involved due to security (https://servant-leader-institute-website.netlify.app/)


If you want to use Docker to containerize and deploy your Node.js application with the latest versions of Node.js, NPM, and SQLite, here's a step-by-step guide. This approach will ensure consistency across environments and eliminate compatibility issues by using Docker to manage dependencies.

Prerequisites
Docker Engine: Make sure Docker Engine and Docker Desktop are installed on your system. You can download it from Docker's website.
Node.js and SQLite: The Docker image we will use will include the latest version of Node.js and SQLite, so you won’t need to manually install them.
Step-by-Step Guide to Deploy using Docker
1. Create the Project Structure
Create a directory for your project and include your existing files:

bash
Copy code
mkdir sli-course-registration
cd sli-course-registration
Your project structure should look like this initially

![image](https://github.com/user-attachments/assets/bafa88dc-0668-4f36-8118-ca415c285f50)

2. Create the Dockerfile
The Dockerfile specifies how to build your Docker container. Create a new file called Dockerfile in your project directory:

Dockerfile
Copy code
# Use the latest Node.js LTS (Long Term Support) version as the base image
FROM node:lts

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies (this will also install the latest version of SQLite)
RUN npm install

# Copy all files from the current directory to the container's working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["node", "app.js"]
This Dockerfile does the following:

Uses the latest stable Node.js image from Docker Hub.
Sets the working directory in the container to /app.
Installs dependencies, including express, sqlite3, and body-parser, from the package.json file.
Copies the current directory (with the app files) into the container.
Exposes port 3000, where your Node.js app will run.
Starts the Node.js application when the container is run.
3. Create .dockerignore
To prevent unnecessary files from being copied into the Docker image, create a .dockerignore file:

lua
Copy code
node_modules
npm-debug.log
Dockerfile
.dockerignore
This file ensures that node_modules and other files that don't need to be in the Docker image are excluded.

4. Update package.json
Ensure your package.json has the necessary dependencies. If you don’t already have one, you can create it using npm init or simply add the following:

json
Copy code
{
  "name": "sli-course-registration",
  "version": "1.0.0",
  "description": "A Node.js app for SLI course registration",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "sqlite3": "^5.1.6",
    "body-parser": "^1.20.1"
  }
}
You can adjust versions to ensure you use the latest.

5. Build the Docker Image
Now that you have your Dockerfile set up, build the Docker image for your Node.js application.

Run the following command in your project directory:

bash
Copy code
docker build -t sli-course-registration .
This will build a Docker image with the tag sli-course-registration.

6. Run the Docker Container
Once the Docker image is built, you can run the container. Since the application runs on port 3000, you’ll need to expose that port when running the container:

bash
Copy code
docker run -p 3000:3000 sli-course-registration
This will map port 3000 on your local machine to port 3000 in the Docker container. Now, you can access your application by visiting http://localhost:3000.

7. Verify SQLite Data Persistence (Optional)
If you want to persist the SQLite database across container restarts, you should mount a volume for the SQLite file. This ensures that the SQLite data survives container restarts.

To do this, run the container with a volume like this:

bash
Copy code
docker run -p 3000:3000 -v $(pwd)/registration.db:/app/registration.db sli-course-registration
This command will map the registration.db file in the current directory to the /app/registration.db file inside the container.

8. Stop the Docker Container
You can stop the running Docker container by pressing CTRL+C or by using the docker stop command if it's running in the background:

bash
Copy code
docker stop <container_id>
You can find the container_id by running docker ps.

9. Deploying on Docker Hub or Cloud Platforms
Once you have the Docker image working locally, you can push it to Docker Hub or use it with a cloud platform like AWS or Azure.

Push to Docker Hub:
Login to Docker Hub:

bash
Copy code
docker login
Tag your image:

bash
Copy code
docker tag sli-course-registration your-dockerhub-username/sli-course-registration
Push the image to Docker Hub:

bash
Copy code
docker push your-dockerhub-username/sli-course-registration
Once the image is pushed, you can pull and run it on any server that has Docker installed.

Summary of Commands
Here’s a summary of the key commands for using Docker:

bash
Copy code
# Build the Docker image
docker build -t sli-course-registration .

# Run the Docker container (without volume)
docker run -p 3000:3000 sli-course-registration

# Run the Docker container (with volume for SQLite persistence)
docker run -p 3000:3000 -v $(pwd)/registration.db:/app/registration.db sli-course-registration

# Stop the container
docker stop <container_id>
Additional Notes
Docker Compose: If you want to simplify managing multiple services (like a separate database), you could use Docker Compose to define the application and database in one configuration.
Environment Variables: You can use environment variables in Docker to manage different configurations (like database paths, API keys, etc.).
By using Docker, you ensure that your application runs in a consistent environment, avoiding any compatibility issues with Node.js or SQLite versions.
