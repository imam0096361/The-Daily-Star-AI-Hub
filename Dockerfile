# Build stage
FROM ubuntu:22.04 AS builder

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM ubuntu:22.04

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Install nginx
RUN apt-get update && \
    apt-get install -y nginx && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy built files from builder
COPY --from=builder /app/dist /var/www/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/sites-available/default

# Copy startup script
COPY start-nginx.sh /usr/local/bin/start-nginx.sh
RUN chmod +x /usr/local/bin/start-nginx.sh

# Expose port (Coolify will set PORT env variable)
EXPOSE 5555

# Start nginx with dynamic port
CMD ["/usr/local/bin/start-nginx.sh"]

