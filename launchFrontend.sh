#!/bin/bash

echo "Deploying HyperMAS Explorer Web Frontend..."

echo "Compiling handlebars templates..."
handlebars templates/*.handlebars -f templates/templates.js

echo "Launching..."
cd server
node launcher.js
