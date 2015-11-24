#!/bin/bash

trap exit SIGINT SIGTERM

while true
do
  gulp testPrep
  fswatch --allow-overflow -r1 \
    -e .git/ \
    -e node_modules/ \
    -e .chrome_dev_user/ \
    -e '.*[.]sw[^f]$' \
    -e '~$' \
    --event Updated \
    --event Created \
    --event Removed \
    --event Renamed \
    src/ test/
done
