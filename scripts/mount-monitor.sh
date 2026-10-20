#!/bin/bash
# Monitor upload mount health and D-state processes
LOG=/home/z/my-project/scripts/mount-monitor.log
echo "=== monitor started $(date +%T) ===" > $LOG
for i in $(seq 1 40); do
  TS=$(date +%T)
  if timeout 4 stat /home/z/my-project/upload >/dev/null 2>&1; then M=OK; else M=HUNG; fi
  P=$(ps -o stat= -p 14201 2>/dev/null | tr -d ' ')
  P2=$(ps -o stat= -p 1137 2>/dev/null | tr -d ' ')
  PORT=$(ss -tln 2>/dev/null | rg -c ":3000 " || echo 0)
  echo "$TS mount=$M p14201=${P:-gone} p1137=${P2:-gone} port3000=$PORT" >> $LOG
  if [ "$M" = "OK" ] && { [ -z "$P" ] || [ "$P" != "D" ]; }; then
    echo "$TS MOUNT OK + 14201 released" >> $LOG
    break
  fi
  sleep 10
done
echo "=== monitor end $(date +%T) ===" >> $LOG
