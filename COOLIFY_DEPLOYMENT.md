# Coolify Deployment Guide

This guide will walk you through deploying The Daily Star AI Hub to Coolify.

## Prerequisites

1. **Coolify Installed**: You need Coolify installed on your server. If not, follow the [Coolify installation guide](https://coolify.io/docs/installation).
2. **GitHub Repository**: Your code should be pushed to GitHub (already done ✅).
3. **Domain (Optional)**: You can use a domain or Coolify's generated subdomain.

## Step-by-Step Deployment Process

### Step 1: Access Coolify Dashboard

1. Open your Coolify dashboard (usually at `http://your-server-ip:8000` or your configured domain).
2. Log in with your credentials.

### Step 2: Create a New Resource

1. Click on **"Resources"** in the sidebar.
2. Click **"New Resource"** or the **"+"** button.
3. Select **"Application"** (not Docker Compose).

### Step 3: Connect GitHub Repository

1. **Source**: Select **"GitHub"**.
2. **Repository**: Choose `imam0096361/The-Daily-Star-AI-Hub` from the dropdown.
   - If it doesn't appear, click **"Connect GitHub"** and authorize Coolify.
3. **Branch**: Select `main` (or your preferred branch).
4. **Build Pack**: Select **"Dockerfile"** (Coolify will auto-detect it).

### Step 4: Configure Build Settings

1. **Dockerfile Location**: Leave as `./Dockerfile` (default).
2. **Docker Context**: Leave as `.` (default).
3. **Port**: 
   - Coolify will automatically detect the port from the Dockerfile.
   - You can set it to `5555` if needed, but Coolify will handle port mapping automatically.
4. **Build Command**: Leave empty (Dockerfile handles everything).

### Step 5: Configure Environment Variables

1. Click on **"Environment Variables"** tab.
2. **No environment variables needed** for this static React app.
   - If you need to add any in the future, you can add them here.

### Step 6: Configure Domain/Port

1. **Port**: Coolify will automatically use port 5555 or assign a dynamic port.
   - The Dockerfile is configured to accept the `PORT` environment variable.
2. **Domain** (Optional):
   - Click **"Add Domain"**.
   - Enter your domain (e.g., `ai-hub.yourdomain.com`).
   - Coolify will automatically configure SSL with Let's Encrypt.

### Step 7: Deploy

1. Review all settings.
2. Click **"Deploy"** or **"Save & Deploy"**.
3. Coolify will:
   - Clone your repository
   - Build the Docker image using your Dockerfile
   - Start the container
   - Configure networking

### Step 8: Monitor Deployment

1. Watch the **"Logs"** tab to see the build progress.
2. You'll see:
   - Repository cloning
   - Docker build process
   - Container startup
   - Nginx starting

### Step 9: Access Your Application

Once deployment is complete:

1. **With Domain**: Access at `https://your-domain.com`
2. **Without Domain**: Access at `http://your-server-ip:5555` or the port Coolify assigned
3. Check the **"URLs"** section in Coolify dashboard for the exact URL.

## Post-Deployment

### Automatic Updates

Coolify can automatically redeploy when you push to GitHub:

1. Go to **"Settings"** → **"Source"**.
2. Enable **"Auto Deploy"**.
3. Select the branch (usually `main`).
4. Now, every push to GitHub will trigger a new deployment.

### Manual Redeploy

1. Go to your application in Coolify.
2. Click **"Redeploy"** button.
3. Or go to **"Deployments"** tab and click **"Deploy"**.

### View Logs

1. Click on **"Logs"** tab to see:
   - Build logs
   - Application logs
   - Nginx access/error logs

### Health Checks

Coolify automatically monitors your application. Check the **"Health"** section to see status.

## Troubleshooting

### Build Fails

1. Check **"Logs"** tab for error messages.
2. Common issues:
   - **Node.js version**: Ensure Node.js 20.x is available (already configured in Dockerfile).
   - **Dependencies**: Check if `package.json` is correct.
   - **Build errors**: Check TypeScript compilation errors.

### Application Not Accessible

1. Check if container is running: **"Containers"** tab.
2. Check nginx logs: **"Logs"** tab.
3. Verify port configuration:
   - Check if port 5555 is exposed in Dockerfile.
   - Verify Coolify port mapping.

### Port Conflicts

1. If port 5555 is already in use:
   - Coolify will automatically assign a different port.
   - The application will adapt to the `PORT` environment variable.

### SSL Certificate Issues

1. If using a domain, ensure:
   - DNS is pointing to your server IP.
   - Port 80 and 443 are open in firewall.
   - Domain is verified in Coolify.

## Configuration Files Reference

- **Dockerfile**: Multi-stage build (Node.js build → Nginx serve)
- **nginx.conf**: Nginx configuration for serving React SPA
- **start-nginx.sh**: Startup script that handles dynamic port configuration
- **.dockerignore**: Excludes unnecessary files from Docker build

## Quick Commands Reference

If you need to SSH into your server and check manually:

```bash
# Check if container is running
docker ps | grep tds-ai-hub

# View container logs
docker logs tds-ai-hub

# Check nginx status inside container
docker exec tds-ai-hub nginx -t
```

## Support

- **Coolify Docs**: https://coolify.io/docs
- **Coolify Discord**: https://discord.gg/coolify
- **GitHub Issues**: Report issues in your repository

---

**Deployment Status**: ✅ Ready for Coolify deployment
**Last Updated**: After Docker configuration for port 5555

