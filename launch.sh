#!/bin/bash

echo "Deploying HyperMAS Explorer..."

cd client
./launchClient.sh &

cd ..

cd server
./launchServer.sh
