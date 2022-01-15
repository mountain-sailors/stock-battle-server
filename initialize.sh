echo "================initializing======================="
# if [ -d "/home/ec2-user/build" ]; then rm -Rf "/home/ec2-user/build"; fi
sudo chown -R ec2-user build
rm -rf node_modules/
npm install
FILE="/home/ec2-user/build/.env"
if [ ! -e $FILE ]; then cp /home/ec2-user/.env /home/ec2-user/build; fi
echo "==================================================="
