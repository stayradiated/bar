#!/bin/sh

PANEL_FIFO=/tmp/bar.fifo
PRINTER=/Volumes/Home/Projects/Bar/bin/printer.js
NODE=/usr/local/bin/node

[ -e $PANEL_FIFO ] && rm $PANEL_FIFO
mkfifo $PANEL_FIFO

# Run bar and keep reading from fifo
tail -n +1 -f $PANEL_FIFO | $NODE $PRINTER &

while true
do
  date "+S%d %b - %I:%M %p" > $PANEL_FIFO
  sleep 5
done

