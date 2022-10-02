#!/bin/bash

echo "Compiling handlebars templates..."
handlebars ./public/templates/*.handlebars -f ./public/templates/templates.js

echo "Compiling less files..."
for file in ./less/*.less; do 
f=`basename $file`
lessc --strict-imports $file ./public/css/${f%%.*}.css ; 
done

echo "Launching client..."
node app.js ./config/docker.js
