echo "================kill process & run program======================="
kill -9 `ps -ef | grep node | awk '{print $2}'`
nohup npm run dev &
echo "================================================================="
