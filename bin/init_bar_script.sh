#!/bin/sh

PANEL_FIFO=/tmp/bar.fifo

[ -e $PANEL_FIFO ] && rm $PANEL_FIFO
mkfifo $PANEL_FIFO

# Run bar
cat $PANEL_FIFO | node ~/Projects/Bar/bin/printer.js &

# Display time
# ~/Github/baskerville/sutils/clock -s -i 10 -f 'S%d %b - %I:%M %p' > $PANEL_FIFO &
