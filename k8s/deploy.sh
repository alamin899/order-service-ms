#!/bin/bash

set -e

# === Configuration ===
AWS_REGION="ap-southeast-1"
AWS_ACCOUNT_ID="127214175530"
NAMESPACE="microservices"
REPO_NAME="ms/product-service"
IMAGE_TAG="latest"

# === Step 1: AWS ECR Login ===
echo "🔐 Logging in to ECR..."
aws ecr get-login-password --region $AWS_REGION | \
docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
echo "✅ ECR login successful"

# === Step 2: Create Namespace if not exists ===
echo "📦 Creating namespace (if not exists)..."
kubectl get namespace $NAMESPACE || kubectl create namespace $NAMESPACE

# === Step 3: Apply Kubernetes manifests ===
echo "🚀 Applying deployment.yaml..."
kubectl apply -f ./k8s/deployment.yaml --namespace $NAMESPACE

echo "🌐 Applying service.yaml..."
kubectl apply -f ./k8s/service.yaml --namespace $NAMESPACE

echo "✅ All resources deployed successfully!"

