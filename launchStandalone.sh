#!/bin/bash
./launchMongoDB.sh $1 &

cd client
./launchClientStandalone.sh &
cd ..

cd server
./launchServerStandalone.sh
cd ..