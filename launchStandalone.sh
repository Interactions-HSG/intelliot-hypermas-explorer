#!/bin/bash

./launchMongoDB.sh &

cd client
./launchClientStandalone.sh &
cd ..

cd server
./launchServerStandalone.sh
cd ..