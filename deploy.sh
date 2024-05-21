#!/bin/bash
# ssh ubuntu@ec2-13-201-103-255.ap-south-1.compute.amazonaws.com -i "../my-nest-api.pem" << EOF
ssh -i "../my-nest-api.pem" ubuntu@ec2-13-201-103-255.ap-south-1.compute.amazonaws.com
sudo su
# cd /var/www/html/dtm_node_backend
# eval \$(ssh-agent)
# ssh-add ~/.ssh/technoknol
# git pull
# npm install --legacy-peer-deps
# npx pm2 restart api
# exit
# EOF