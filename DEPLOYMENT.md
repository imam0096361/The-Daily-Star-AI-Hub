# Ubuntu Server Deployment Guide

This guide will help you deploy The Daily Star AI Hub on an Ubuntu server using Docker Compose.

## Prerequisites

- Ubuntu 20.04 or later
- Docker installed
- Docker Compose installed
- Git installed

## Step 1: Install Docker and Docker Compose

### Install Docker

```bash
# Update package index
sudo apt-get update

# Install prerequisites
sudo apt-get install -y ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up the repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Add your user to docker group (optional, to run docker without sudo)
sudo usermod -aG docker $USER
```

### Verify Installation

```bash
docker --version
docker compose version
```

## Step 2: Clone Repository

```bash
# Navigate to your desired directory
cd /opt  # or any directory you prefer

# Clone the repository
sudo git clone https://github.com/imam0096361/The-Daily-Star-AI-Hub.git
cd The-Daily-Star-AI-Hub
```

## Step 3: Build and Start the Application

```bash
# Build and start the container
sudo docker compose up -d --build

# Or if using older docker-compose command:
# sudo docker-compose up -d --build
```

This will:
- Build the Docker image (installs Node.js, builds the React app, sets up nginx)
- Start the container
- Map port 5555 on your server to port 5555 in the container

## Step 4: Verify Deployment

```bash
# Check if container is running
sudo docker ps

# Check container logs
sudo docker logs tds-ai-hub

# Test the application
curl http://localhost:5555
```

## Step 5: Access Your Application

Your application will be available at:
- **Local**: `http://localhost:5555`
- **Network**: `http://your-server-ip:5555`
- **Domain**: `http://your-domain.com:5555` (if you configure DNS)

## Step 6: Configure Firewall (if needed)

If you have UFW firewall enabled:

```bash
# Allow port 5555
sudo ufw allow 5555/tcp

# Check firewall status
sudo ufw status
```

## Management Commands

### View Logs

```bash
# View all logs
sudo docker logs tds-ai-hub

# Follow logs in real-time
sudo docker logs -f tds-ai-hub

# View last 100 lines
sudo docker logs --tail 100 tds-ai-hub
```

### Stop the Application

```bash
sudo docker compose down
```

### Restart the Application

```bash
sudo docker compose restart
```

### Rebuild After Code Changes

```bash
# Stop, rebuild, and start
sudo docker compose down
sudo docker compose up -d --build
```

### Update Application

```bash
# Pull latest changes
cd /opt/The-Daily-Star-AI-Hub
sudo git pull

# Rebuild and restart
sudo docker compose down
sudo docker compose up -d --build
```

## Configure as a Service (Optional)

To automatically start the application on server reboot:

### Create Systemd Service

```bash
sudo nano /etc/systemd/system/tds-ai-hub.service
```

Add the following content:

```ini
[Unit]
Description=The Daily Star AI Hub
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/opt/The-Daily-Star-AI-Hub
ExecStart=/usr/bin/docker compose up -d
ExecStop=/usr/bin/docker compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
# Reload systemd
sudo systemctl daemon-reload

# Enable service
sudo systemctl enable tds-ai-hub.service

# Start service
sudo systemctl start tds-ai-hub.service

# Check status
sudo systemctl status tds-ai-hub.service
```

## Configure Nginx Reverse Proxy (Optional)

If you want to use port 80/443 with a domain:

### Install Nginx

```bash
sudo apt-get install -y nginx
```

### Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/tds-ai-hub
```

Add the following:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5555;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/tds-ai-hub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Setup SSL with Let's Encrypt

```bash
# Install certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal is set up automatically
```

## Troubleshooting

### Container won't start

```bash
# Check logs
sudo docker logs tds-ai-hub

# Check if port is already in use
sudo netstat -tulpn | grep 5555

# Check Docker status
sudo systemctl status docker
```

### Build fails

```bash
# Check Docker build logs
sudo docker compose build --no-cache

# Verify Dockerfile syntax
sudo docker build -t test-build .
```

### Application not accessible

1. **Check firewall**: `sudo ufw status`
2. **Check container**: `sudo docker ps`
3. **Check port mapping**: `sudo docker port tds-ai-hub`
4. **Check nginx inside container**: `sudo docker exec tds-ai-hub nginx -t`

### Permission issues

```bash
# If you get permission denied, add user to docker group
sudo usermod -aG docker $USER
# Log out and log back in
```

## Health Check

The docker-compose.yml includes a health check. Monitor it with:

```bash
sudo docker inspect --format='{{.State.Health.Status}}' tds-ai-hub
```

## Clean Up

To remove everything:

```bash
# Stop and remove containers
sudo docker compose down

# Remove image
sudo docker rmi tds-ai-hub:latest

# Remove volumes (if any)
sudo docker volume prune
```

## Production Recommendations

1. **Use a reverse proxy** (Nginx) for SSL/TLS
2. **Set up automatic updates** with a cron job or CI/CD
3. **Monitor logs** regularly
4. **Backup** your configuration files
5. **Use environment variables** for sensitive data (if needed)
6. **Set up monitoring** (optional: Prometheus, Grafana)

## Support

For issues or questions:
- Check Docker logs: `sudo docker logs tds-ai-hub`
- Check nginx logs inside container: `sudo docker exec tds-ai-hub tail -f /var/log/nginx/error.log`
- GitHub Issues: https://github.com/imam0096361/The-Daily-Star-AI-Hub/issues

---

**Deployment Status**: ✅ Ready for Ubuntu Server with Docker Compose
**Port**: 5555
**Base Image**: Ubuntu 22.04

