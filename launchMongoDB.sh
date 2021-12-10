#!/bin/bash
if [ -z "$1" ]
then
  echo "No folder set"
else
  echo "Launching mongoDB in $1"
  mkdir c:/data/$1
  mongod --dbpath="c:\data\\$1"
  
fi