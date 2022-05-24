#!/bin/bash

# Install Lume
deno run -A https://deno.land/x/lume@v1.9.0/install.ts

# Create some required untracked directories if they don't already exist
mkdir -p building
mkdir -p public

# Setup an initial ENV file if it doesn't already exist
cp -n .env.example .env

echo "Please edit '.env' to suit this environment."
