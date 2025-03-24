# Clone the Git repository
echo "Pulling latest changes..."
git pull

cd $APP_DIR
sudo docker-compose up --build -d

# Check if Docker Compose started correctly
if ! sudo docker-compose ps | grep "Up"; then
  echo "Docker containers failed to start. Check logs with 'docker-compose logs'."
  exit 1
fi

echo "Deployment complete. Your Next.js app is now running. 
Next.js is available at https://www.rheingold-salon.de.
