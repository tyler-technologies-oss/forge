# Deployment Guide for Tyler Forge MCP Server

## Local Usage (Claude Desktop) - Current Issue Fixed

The error `spawn node ENOENT` occurs because Claude Desktop can't find the `node` command. The fix has been applied - using the full path to node in your config.

**Your config has been updated to:**
```json
{
  "mcpServers": {
    "forge": {
      "command": "/Users/franklin/.asdf/installs/nodejs/22.6.0/bin/node",
      "args": ["/Users/franklin/Developer/Socrata/forge/forge-mcp-server/dist/index.js"]
    }
  }
}
```

**Now restart Claude Desktop and the server should work!**

## Remote Deployment (AWS/SSE)

The MCP server now supports SSE (Server-Sent Events) for remote hosting. This allows you to host it on AWS and connect from anywhere.

### AWS Deployment Options

#### Option 1: AWS App Runner (Easiest)

1. **Create Dockerfile:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
COPY src ./src
EXPOSE 3000
CMD ["node", "dist/server-sse.js"]
```

2. **Deploy to App Runner:**
```bash
# Build and push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin [your-ecr-uri]
docker build -t forge-mcp .
docker tag forge-mcp:latest [your-ecr-uri]/forge-mcp:latest
docker push [your-ecr-uri]/forge-mcp:latest

# Create App Runner service via console or CLI
```

3. **Configure Claude to use remote server:**
```json
{
  "mcpServers": {
    "forge-remote": {
      "transport": "sse",
      "url": "https://your-app-runner-url.awsapprunner.com/sse"
    }
  }
}
```

#### Option 2: AWS Lambda + API Gateway

1. **Create Lambda handler:**
```javascript
// lambda-handler.js
import { ForgeMCPServer } from './dist/server-sse.js';
import serverless from 'serverless-http';

const server = new ForgeMCPServer();
export const handler = serverless(server.app);
```

2. **Deploy with Serverless Framework:**
```yaml
# serverless.yml
service: forge-mcp-server
provider:
  name: aws
  runtime: nodejs20.x
  region: us-east-1
functions:
  mcp:
    handler: lambda-handler.handler
    events:
      - http:
          path: /{proxy+}
          method: ANY
          cors: true
```

3. **Deploy:**
```bash
npm run build
serverless deploy
```

#### Option 3: EC2/ECS with Load Balancer

1. **Build Docker image:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm ci && npm run build
EXPOSE 3000
CMD ["npm", "run", "start:sse"]
```

2. **Deploy to ECS:**
```bash
# Create task definition, service, and ALB
# Configure health checks on /health endpoint
```

### Environment Variables for Production

```bash
# .env.production
PORT=3000
NODE_ENV=production
FORGE_REPO_PATH=/app/forge  # Include Forge repo in Docker image
CACHE_TTL=3600000  # 1 hour cache
```

### Security Considerations

1. **API Key Authentication** (add to server-sse.ts):
```typescript
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});
```

2. **CORS Configuration:**
```typescript
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));
```

3. **Rate Limiting:**
```bash
npm install express-rate-limit
```

```typescript
import rateLimit from 'express-rate-limit';
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests
}));
```

### Monitoring & Logging

1. **CloudWatch Integration:**
```typescript
import winston from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch';

const logger = winston.createLogger({
  transports: [
    new WinstonCloudWatch({
      logGroupName: 'forge-mcp-server',
      logStreamName: `${process.env.NODE_ENV}-${Date.now()}`
    })
  ]
});
```

2. **Health Checks:**
- The `/health` endpoint is already implemented
- Configure ALB/App Runner health checks to use this endpoint

### Testing Remote Server

```bash
# Test SSE connection
curl -N https://your-server.com/sse

# Test health endpoint
curl https://your-server.com/health

# Test with Claude Desktop
# Update config to use SSE transport with your URL
```

## SSE vs STDIO Transport

| Feature | STDIO (Local) | SSE (Remote) |
|---------|--------------|--------------|
| Setup | Simple - just file paths | Requires hosting |
| Performance | Fastest | Network latency |
| Security | Local only | Needs auth/HTTPS |
| Scalability | Single user | Multi-user |
| Cost | Free | AWS hosting costs |
| Use Case | Development | Production/Team |

## Troubleshooting

### Local (Claude Desktop) Issues:

1. **"spawn node ENOENT"** - Fixed by using full path to node
2. **"Server closed unexpectedly"** - Check if `npm run build` was run
3. **"Cannot find module"** - Run `npm install`

### Remote (SSE) Issues:

1. **CORS errors** - Configure allowed origins
2. **Timeout errors** - Increase Lambda timeout or use App Runner
3. **Authentication fails** - Check API key configuration
4. **SSE drops connection** - Implement reconnection logic

## Cost Estimates (AWS)

- **App Runner**: ~$5-15/month for light usage
- **Lambda**: ~$0-5/month with free tier
- **ECS Fargate**: ~$10-30/month
- **EC2 t3.micro**: ~$8/month

## Next Steps

1. For local use: Restart Claude Desktop - it should now work!
2. For remote hosting: Choose deployment option and follow steps
3. Add authentication if deploying publicly
4. Set up monitoring and alerts
5. Consider CDN for static Forge documentation assets