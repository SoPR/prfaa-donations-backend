#!/bin/bash

# Activate nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Install any missing npm dependencies
cd /opt/www/prfaa-donations-backend
yarn install

# Set environment
export NODE_ENV="production"

# Start our app!
NODE_ENV=production forever start src/