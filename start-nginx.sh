#!/bin/bash

# Get port from environment variable (Coolify provides PORT, default to 5555)
PORT=${PORT:-5555}

# Update nginx config with the port
sed -i "s/listen [0-9]*;/listen ${PORT};/" /etc/nginx/sites-available/default

# Start nginx
exec nginx -g "daemon off;"

