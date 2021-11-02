#!/bin/bash

npm install -g handlebars
npm install -g less

cd client
npm install
cd ..

cd server
npm install
cd ..

echo "Done setting up"
