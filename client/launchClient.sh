#!/bin/bash

echo "Compiling handlebars templates..."
handlebars ./public/templates/*.handlebars -f ./public/templates/templates.js

echo "Compiling less files..."
for file in ./less/*.less; do 
echo `basename $file`
lessc --strict-imports $file ./public/css/${file%%.*}.css ; 
done

echo "Launching client..."
node app.js