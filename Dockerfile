# Use an official Node.js runtime as the base image
FROM node:20.0-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install --silent

# Copy the rest of the application files
COPY . .

# Expose port 3000 for the application
EXPOSE 3000

# Command to start the application development server
CMD ["npm", "start"] 
