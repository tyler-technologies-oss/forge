#!/usr/bin/env node

/**
 * Test script for Tyler Forge MCP Server
 * This simulates MCP client requests to verify the server is working
 */

import { spawn } from 'child_process';
import { createInterface } from 'readline';

// Start the MCP server
const server = spawn('node', ['dist/index.js'], {
  stdio: ['pipe', 'pipe', 'pipe']
});

const rl = createInterface({
  input: server.stdout,
  output: process.stdout
});

// Handle server stderr
server.stderr.on('data', (data) => {
  console.error('Server log:', data.toString());
});

// Test requests
const testRequests = [
  // Initialize connection
  {
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: {
        name: 'test-client',
        version: '1.0.0'
      }
    }
  },
  // List available resources
  {
    jsonrpc: '2.0',
    id: 2,
    method: 'resources/list',
    params: {}
  },
  // List available tools
  {
    jsonrpc: '2.0',
    id: 3,
    method: 'tools/list',
    params: {}
  },
  // Read components resource
  {
    jsonrpc: '2.0',
    id: 4,
    method: 'resources/read',
    params: {
      uri: 'forge://components'
    }
  },
  // Generate a React button component
  {
    jsonrpc: '2.0',
    id: 5,
    method: 'tools/call',
    params: {
      name: 'generateComponent',
      arguments: {
        component: 'button',
        framework: 'react',
        variant: 'raised',
        theme: 'primary'
      }
    }
  },
  // Find button examples
  {
    jsonrpc: '2.0',
    id: 6,
    method: 'tools/call',
    params: {
      name: 'findExamples',
      arguments: {
        component: 'button'
      }
    }
  }
];

let currentTest = 0;

// Send test requests
function sendNextTest() {
  if (currentTest < testRequests.length) {
    const request = testRequests[currentTest];
    console.log(`\n📤 Sending request ${request.id}: ${request.method}`);
    server.stdin.write(JSON.stringify(request) + '\n');
    currentTest++;
  } else {
    console.log('\n✅ All tests completed!');
    setTimeout(() => {
      server.kill();
      process.exit(0);
    }, 1000);
  }
}

// Handle responses
rl.on('line', (line) => {
  try {
    const response = JSON.parse(line);
    console.log(`\n📥 Response for request ${response.id}:`);
    
    if (response.error) {
      console.error('❌ Error:', response.error);
    } else if (response.result) {
      // Pretty print based on response type
      if (response.id === 2) { // resources/list
        console.log('Available resources:', response.result.resources?.length || 0);
        response.result.resources?.forEach(r => {
          console.log(`  - ${r.name}: ${r.uri}`);
        });
      } else if (response.id === 3) { // tools/list
        console.log('Available tools:', response.result.tools?.length || 0);
        response.result.tools?.forEach(t => {
          console.log(`  - ${t.name}: ${t.description}`);
        });
      } else if (response.id === 4) { // components resource
        const data = JSON.parse(response.result.contents[0].text);
        console.log(`Total components: ${data.total}`);
        console.log('Categories:', Object.keys(data.categories).join(', '));
      } else if (response.id === 5) { // generateComponent
        console.log('Generated code preview:');
        const code = response.result.content[0].text;
        console.log(code.substring(0, 200) + '...');
      } else if (response.id === 6) { // findExamples
        console.log('Found examples:');
        const examples = response.result.content[0].text;
        console.log(examples.substring(0, 200) + '...');
      } else {
        console.log('✓ Success');
      }
    }
    
    // Send next test
    setTimeout(sendNextTest, 500);
  } catch (err) {
    console.error('Failed to parse response:', line);
  }
});

// Start testing
console.log('🧪 Starting Tyler Forge MCP Server Tests\n');
console.log('=' . repeat(50));
sendNextTest();

// Handle exit
process.on('SIGINT', () => {
  server.kill();
  process.exit(0);
});