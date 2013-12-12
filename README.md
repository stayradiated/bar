bar
===

Basically it's BAR (Bar Ain't Recursive) by LemonBoy but using Node-Webkit.

It uses Unix sockets to receive data in the same format as BAR.

Positives:

- Don't need to run XQuartz
- Mouse support
- Style via CSS

Negatives:

- More memory usage
- Acts like a regular window
  - Has a shadow
  - Can be moved by window managers
  - Rounded corners

## Using

You'll need to download a copy of [node-webkit](https://github.com/rogerwang/node-webkit#downloads).

On OS X with zsh, I added `alias nw=~/Applications/node-webkit.app/Contents/MacOS/node-webkit` so I could easily start the app whenever I wanted:

    cd ~/Projects/Bar
    nw .

## Multiple Desktops

To show on multiple desktops, right click the dock icon, and select **Options** > **All Desktops**.

## Window Managers

If you use something like Zephyros, then you will be be annoyed when you accidentally move the Bar from it's position. To fix this I added a small `if` statement in my scrip that would ignore windows with height of `< ~30` pixels.
## Shadows

Either use the node-webkit transparency branch, or something like https://github.com/puffnfresh/toggle-osx-shadows

## Rounded corners

Edit SArtFile.bin using https://github.com/alexzielenski/sartFileTool and replace 54-1.png, 56-1.png, 89-1.png and 91-1.png. See [my config files](https://github.com/stayradiated/dotfiles/tree/master/OS%20X%20Theme) for more details.
