#!/bin/bash

mkdir c:/data/$1

./launchMongoDB.sh $1 &

cd client
./launchClientStandalone.sh &
cd ..

cd server
./launchServerStandalone.sh
cd ..