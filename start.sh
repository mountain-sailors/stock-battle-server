echo "================kill process & run program======================="
kill -9 `ps -ef | grep node | awk '{print $2}'`
cp /home/ec2-user/.env .
nohup npm run dev &
echo "================================================================="
