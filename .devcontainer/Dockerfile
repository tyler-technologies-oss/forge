# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.205.1/containers/typescript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version (use -bullseye variants on local arm64/Apple Silicon): 16, 14, 12, 16-bullseye, 14-bullseye, 12-bullseye, 16-buster, 14-buster, 12-buster
ARG VARIANT="16-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

# Add forge-vscode
ARG GITHUB_TOKEN
RUN git clone https://${GITHUB_TOKEN}@github.com/tyler-technologies/forge-vscode.git /home/node/.vscode-server/extensions/forge-vscode

# Install Google Chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
RUN apt-get update && apt-get -y install google-chrome-stable

RUN sudo chown -R node /home/node/
