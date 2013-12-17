#!/bin/sh

PANEL_FIFO=/tmp/bar.fifo

[ -e $PANEL_FIFO ] && rm $PANEL_FIFO
mkfifo $PANEL_FIFO

# Run bar and keep reading from fifo
tail -n +1 -f $PANEL_FIFO | node ~/Projects/Bar/bin/printer.js & 

while true
do
  date "+S%d %b - %I:%M %p" > $PANEL_FIFO
  sleep 1
done

