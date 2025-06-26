# Order Service - Docker Deployment (AWS ECR)

This guide explains how to authenticate with AWS ECR, pull the Docker image for the Product Service, and run it locally.

---

## 🧰 Prerequisites

- Docker installed and running
- AWS CLI configured (`aws configure`) with valid credentials
- Permissions to access the ECR repository

---

## 🔐 Step 1: Authenticate Docker to AWS ECR

Run the following command to authenticate your Docker CLI with the ECR registry:

```bash
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 127214175530.dkr.ecr.ap-southeast-1.amazonaws.com
```

## 📦 Pull the Docker Image from AWS ECR

```bash
docker pull 127214175530.dkr.ecr.ap-southeast-1.amazonaws.com/ms/order-service:latest
```

## 🚀 Run the Product Service Container

```bash
docker run -d \
  --name order-service-ms \
  -p 4001:3000 \
  127214175530.dkr.ecr.ap-southeast-1.amazonaws.com/ms/order-service:latest
