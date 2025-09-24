#!/bin/bash

# Tyler Forge MCP Server - AWS App Runner Deployment Script
# This script builds and deploys the MCP server to AWS App Runner

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
AWS_REGION=${AWS_REGION:-"us-east-1"}
ECR_REGISTRY=${ECR_REGISTRY:-""}
IMAGE_NAME="forge-mcp-server"
SERVICE_NAME="forge-mcp-server"
DOCKERFILE="Dockerfile.standalone"

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check for required tools
check_requirements() {
    print_status "Checking requirements..."
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed"
        exit 1
    fi
    
    if ! command -v aws &> /dev/null; then
        print_error "AWS CLI is not installed"
        exit 1
    fi
    
    print_status "All requirements met"
}

# Build the bundle first
build_bundle() {
    print_status "Building component bundle..."
    npm run bundle
    
    if [ ! -f "dist/data/forge-bundle.json" ]; then
        print_error "Bundle file not created. Run 'npm run bundle' first."
        exit 1
    fi
    
    print_status "Bundle created successfully"
}

# Build Docker image for x86/x64
build_docker_image() {
    print_status "Building Docker image for x86/x64 architecture..."
    
    # Build with platform flag for App Runner compatibility
    docker buildx build \
        --platform linux/amd64 \
        -t ${IMAGE_NAME}:latest \
        -f ${DOCKERFILE} \
        .
    
    print_status "Docker image built successfully"
}

# Get ECR login token
ecr_login() {
    print_status "Logging into ECR..."
    
    if [ -z "$ECR_REGISTRY" ]; then
        # Get the registry URL from AWS account
        ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
        ECR_REGISTRY="${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
    fi
    
    aws ecr get-login-password --region ${AWS_REGION} | \
        docker login --username AWS --password-stdin ${ECR_REGISTRY}
    
    print_status "ECR login successful"
}

# Create ECR repository if it doesn't exist
create_ecr_repository() {
    print_status "Checking ECR repository..."
    
    if ! aws ecr describe-repositories --repository-names ${IMAGE_NAME} --region ${AWS_REGION} &> /dev/null; then
        print_status "Creating ECR repository..."
        aws ecr create-repository \
            --repository-name ${IMAGE_NAME} \
            --region ${AWS_REGION} \
            --image-scanning-configuration scanOnPush=true
    else
        print_status "ECR repository already exists"
    fi
}

# Push image to ECR
push_to_ecr() {
    print_status "Tagging image for ECR..."
    docker tag ${IMAGE_NAME}:latest ${ECR_REGISTRY}/${IMAGE_NAME}:latest
    
    print_status "Pushing image to ECR..."
    docker push ${ECR_REGISTRY}/${IMAGE_NAME}:latest
    
    print_status "Image pushed successfully"
}

# Deploy to App Runner
deploy_to_apprunner() {
    print_status "Deploying to AWS App Runner..."
    
    # Check if service exists
    if aws apprunner list-services --region ${AWS_REGION} | grep -q ${SERVICE_NAME}; then
        print_status "Updating existing App Runner service..."
        
        # Get the service ARN
        SERVICE_ARN=$(aws apprunner list-services --region ${AWS_REGION} \
            --query "ServiceSummaryList[?ServiceName=='${SERVICE_NAME}'].ServiceArn" \
            --output text)
        
        # Update the service with new image
        aws apprunner update-service \
            --service-arn ${SERVICE_ARN} \
            --source-configuration '{
                "ImageRepository": {
                    "ImageIdentifier": "'${ECR_REGISTRY}'/'${IMAGE_NAME}':latest",
                    "ImageConfiguration": {
                        "Port": "8080",
                        "RuntimeEnvironmentVariables": {
                            "NODE_ENV": "production",
                            "PORT": "8080",
                            "FORGE_BUNDLED": "true"
                        }
                    },
                    "ImageRepositoryType": "ECR"
                },
                "AutoDeploymentsEnabled": false
            }' \
            --region ${AWS_REGION}
            
    else
        print_status "Creating new App Runner service..."
        
        aws apprunner create-service \
            --service-name ${SERVICE_NAME} \
            --source-configuration '{
                "ImageRepository": {
                    "ImageIdentifier": "'${ECR_REGISTRY}'/'${IMAGE_NAME}':latest",
                    "ImageConfiguration": {
                        "Port": "8080",
                        "RuntimeEnvironmentVariables": {
                            "NODE_ENV": "production",
                            "PORT": "8080",
                            "FORGE_BUNDLED": "true"
                        }
                    },
                    "ImageRepositoryType": "ECR"
                },
                "AutoDeploymentsEnabled": false
            }' \
            --health-check-configuration '{
                "Protocol": "HTTP",
                "Path": "/health",
                "Interval": 30,
                "Timeout": 5,
                "HealthyThreshold": 2,
                "UnhealthyThreshold": 3
            }' \
            --auto-scaling-configuration-arn "arn:aws:apprunner:${AWS_REGION}:aws:autoscaling-configuration/DefaultConfiguration/1/00000000000000000000000000000001" \
            --region ${AWS_REGION}
    fi
    
    print_status "Deployment initiated. Check AWS Console for status."
}

# Main deployment flow
main() {
    print_status "Starting Tyler Forge MCP Server deployment..."
    
    check_requirements
    build_bundle
    build_docker_image
    
    # Only proceed with AWS deployment if --deploy flag is passed
    if [[ "$1" == "--deploy" ]]; then
        ecr_login
        create_ecr_repository
        push_to_ecr
        deploy_to_apprunner
        
        print_status "Deployment complete!"
        print_status "Service URL will be available in AWS App Runner console"
    else
        print_status "Docker image built successfully"
        print_status "Run with --deploy flag to push to AWS"
        print_status "Example: ./deploy.sh --deploy"
    fi
}

# Run main function
main "$@"