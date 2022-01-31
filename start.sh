echo "================kill process & run program======================="
sudo chown -R ec2-user build
kill -9 `ps -ef | grep node | awk '{print $2}'`
rm -rf node_modules/
npm install
cp /home/ec2-user/.env build
nohup npm run dev &
echo "================================================================="
