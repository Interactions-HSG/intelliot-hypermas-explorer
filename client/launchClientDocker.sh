#!/bin/bash

echo "Compiling handlebars templates..."
handlebars ./public/templates/*.handlebars -f ./public/templates/templates.js

echo "Compiling less files..."
for file in ./less/*.less; do 
f=`basename $file`
lessc --strict-imports $file ./public/css/${f%%.*}.css ; 
done

cd ./public/js/blockly/new_blocks
cat *.js > ../block_compressed.js

cd ../../../../

echo "Launching client..."
node app.js ./config/docker.js
