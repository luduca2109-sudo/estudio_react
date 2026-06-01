#!/bin/bash
echo "Iniciando el despliegue del Dashboard React..."

# 1. Iniciar sesión en AWS ECR desde el servidor EC2
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin REPO_URI=469039262667.dkr.ecr.us-east-1.amazonaws.com

# 2. Definir variables
REPO_URI=469039262667.dkr.ecr.us-east-1.amazonaws.com/app-react-repo
IMAGE_TAG=latest

# 3. Detener y eliminar el contenedor anterior si ya existe para liberar el puerto 80
if [ "$(docker ps -aq -f name=dashboard-web)" ]; then
    echo "Deteniendo contenedor antiguo..."
    docker stop dashboard-web
    docker rm dashboard-web
fi

# 4. Descargar la última imagen del repositorio de ECR
echo "Descargando nueva imagen desde ECR..."
docker pull $REPO_URI:$IMAGE_TAG

# 5. Encender el nuevo contenedor mapeando el puerto 80 del servidor
echo "Encendiendo el nuevo contenedor..."
docker run -d --name dashboard-web -p 80:80 --restart always $REPO_URI:$IMAGE_TAG

echo "¡Despliegue completado con éxito con Docker!"