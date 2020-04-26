pid=$(pgrep -f 'ng serve')
echo "kill $pid"
kill -9 $pid
