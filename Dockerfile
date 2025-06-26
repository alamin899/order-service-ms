# Use official Node.js image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy only dependency definitions
COPY package*.json ./

# Install dependencies INSIDE container (native modules built here)
RUN npm install

# Copy rest of the source code
COPY . .

# Expose app port
EXPOSE 3000

# Start app
CMD ["node", "app.js"]
