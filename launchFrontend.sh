#!/bin/bash

echo "Deploying HyperMAS Explorer Web Frontend..."

echo "Compiling handlebars templates..."
handlebars client/templates/*.handlebars -f client/templates/templates.js

echo "Compiling less files..."
for file in client/less/*.less; do 
echo `basename $file`
lessc --strict-imports $file client/css/`basename ${file%%.*}`.css ; 
done

echo "Launching..."
cd server
nodemon launcher.js
