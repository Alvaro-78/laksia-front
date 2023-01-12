#! /bin/bash

Green='\033[0;32m'
Purple='\033[0;35m'
Yellow='\033[1;33m'

echo -e "${Green}Running front ${Purple}" 

docker rm -f laksia_front_dev

# docker-compose -f docker-compose.yml build dev

docker-compose -f docker-compose.yml up dev
