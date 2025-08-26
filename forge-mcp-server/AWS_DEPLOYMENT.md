# AWS App Runner Deployment Guide

## ✅ Docker Container Successfully Built and Tested!

The Tyler Forge MCP Server is now ready for deployment to AWS App Runner.

## Quick Start

### 1. Build the Bundle (Required First Step)
```bash
# Generate the component bundle
npm run bundle
```
This creates a 1MB JSON file with all Forge documentation and component data.

### 2. Build Docker Image Locally
```bash
# Build for x86/x64 (AWS App Runner architecture)
docker buildx build --platform linux/amd64 -t forge-mcp-server:latest -f Dockerfile.standalone --load .
```

### 3. Test Locally (Optional)
```bash
# Run on port 8081 (change if needed)
docker run -d --name forge-test -p 8081:8080 forge-mcp-server:latest

# Test health endpoint
curl http://localhost:8081/health

# Stop when done
docker stop forge-test && docker rm forge-test
```

### 4. Deploy to AWS App Runner

#### Option A: Using the Deployment Script
```bash
# Make sure AWS CLI is configured
aws configure

# Deploy (builds, pushes to ECR, creates/updates App Runner service)
./deploy.sh --deploy
```

#### Option B: Manual Deployment

1. **Create ECR Repository:**
```bash
aws ecr create-repository --repository-name forge-mcp-server --region us-east-1
```

2. **Push to ECR:**
```bash
# Get login token
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin [YOUR_ACCOUNT_ID].dkr.ecr.us-east-1.amazonaws.com

# Tag image
docker tag forge-mcp-server:latest [YOUR_ACCOUNT_ID].dkr.ecr.us-east-1.amazonaws.com/forge-mcp-server:latest

# Push
docker push [YOUR_ACCOUNT_ID].dkr.ecr.us-east-1.amazonaws.com/forge-mcp-server:latest
```

3. **Create App Runner Service:**
   - Go to AWS App Runner Console
   - Click "Create service"
   - Choose "Container registry" → "Amazon ECR"
   - Select your image
   - Configure:
     - Port: 8080
     - Health check path: /health
     - Environment variables:
       - `NODE_ENV`: production
       - `PORT`: 8080
       - `FORGE_BUNDLED`: true

## Architecture Notes

### Platform Compatibility
- **Built for:** linux/amd64 (x86/x64)
- **Tested on:** Apple Silicon with emulation
- **Runs on:** AWS App Runner, ECS, Lambda, EC2

### Bundle Strategy
- All component data is pre-bundled into a 1MB JSON file
- No need to include the entire Forge repository
- Fast startup and minimal memory usage
- Works offline once loaded

### Endpoints
- `/health` - Health check (returns 200 OK)
- `/sse` - SSE endpoint for MCP protocol
- `/message` - POST endpoint for MCP messages

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 8080 |
| `NODE_ENV` | Environment | production |
| `FORGE_BUNDLED` | Use bundled data | true |
| `ALLOWED_ORIGINS` | CORS origins | * |
| `API_KEY` | Optional API key | (none) |

## Cost Estimates

- **App Runner:** ~$5-15/month for light usage
- **ECR Storage:** ~$0.10/GB/month
- **Data Transfer:** ~$0.09/GB

## Monitoring

Once deployed, monitor your service:

1. **App Runner Console:** View logs, metrics, and status
2. **CloudWatch:** Detailed logs and custom metrics
3. **X-Ray:** Request tracing (if enabled)

## Troubleshooting

### Common Issues

1. **"Platform mismatch" warning on Apple Silicon**
   - This is expected when building for x86/x64
   - The image will work correctly on AWS

2. **Port already in use**
   - Change the local port mapping: `-p [NEW_PORT]:8080`

3. **Bundle not found**
   - Run `npm run bundle` before building Docker image

4. **Health check failing**
   - Ensure PORT environment variable is set to 8080
   - Check CloudWatch logs for startup errors

## Success Confirmation

Your deployment is successful when:
- ✅ Health endpoint returns `{"status":"ok"}`
- ✅ App Runner status shows "Running"
- ✅ CloudWatch logs show "Tyler Forge MCP Server (SSE) running"
- ✅ SSE endpoint accepts connections

## Next Steps

1. Configure Claude Desktop to use your deployed server:
```json
{
  "mcpServers": {
    "forge-remote": {
      "transport": "sse",
      "url": "https://[YOUR-APP-RUNNER-URL]/sse"
    }
  }
}
```

2. Test with Claude:
   - "List all Forge components"
   - "Generate a React button component"
   - "Show me Forge design tokens"

3. Add authentication if needed (see DEPLOYMENT.md for details)

## Support

- Check logs: `docker logs forge-test` (local) or CloudWatch (AWS)
- View bundle: `cat dist/data/forge-bundle.json | jq '.metadata'`
- Test SSE: `curl -N https://[YOUR-URL]/sse`