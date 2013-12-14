BAR
===

Basically it's [BAR (Bar Ain't Recursive) by LemonBoy](https://github.com/LemonBoy/bar) but using Node-Webkit.

It uses unix sockets to receive data in the same format as BAR.

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


## Instructions

### 1. Setting up

1. Download the latest version of node-webkit from https://s3.amazonaws.com/node-webkit/v0.8.2/node-webkit-v0.8.2-osx-ia32.zip

2. Extract the zip. You will have three files The only one you need is `node-webkit.app`. Move it into your `/Applications` folder.

3. Using git, clone a copy of my repo via `git clone https://github.com/stayradiated/bar.git`. This will create a folder called `bar`, open it using `cd bar`.

4. To start bar, run the command:

        /Applications/node-webkit.app/Contents/MacOS/node-webkit .

  The `.` at the end is important. Hopefully, this should display the bar at the top of the screen. At the moment it will be blank, because nothing is sending data to it.

5. Basically a socket has been created at `/tmp/bar.sock` and the application is listening to it waiting for instructions on what to print. Bar uses the same formatting as LemonBoys - https://github.com/LemonBoy/bar#text-formatting.

6. To close Bar, focus on it and press 'Cmd-Q', or select 'Quit bar' from the menu.

### 2. Using pipes

Unix sockets can be useful, but you probably want to use a named pipe instead.

1. Install Node.js, from http://nodejs.org/dist/v0.10.23/node-v0.10.23.pkg (or using a package manager like homebrew, it doesn't matter).

2. If you have installed Node.js properly, you should be able to run the command `npm install` (from inside the bar folder) and have it install the development dependencies. 

3. You will also need to install coffeescript via `npm install -g coffee-script`. If it fails, you may need to run the command with admin priveliges via `sudo npm install -g coffee-script`.

4. Edit the configuration file at `source/scripts/config.coffee`. Uncomment the line that defines the script to use, and edit the path to match where you cloned the repo to.

        script: '~/Projects/Bar/init_bar_script'

  You can also edit the height of the bar, and it's position on the screen in this file.

5. Then edit the file `init_bar_script` in the root of folder. You will need to change the path on line 9:

        cat $PANEL_FIFO | coffee ~/Projects/Bar/printer.coffee &

6. Comment out the last line using a `#`. It gives you an example of how data is piped, but unless you install clock.c, it will just crash the script. 

        # ~/Github/baskerville/sutils/clock -s -i 10 -f 'S%d %b - %I:%M %p' > $PANEL_FIFO &

7. Compile the application using the command `cake build`. You will need to do this even time you change something inside the `source/scripts` folder. To make it easier you can also use `cake watch`.

8. Start the bar again using the same command from 1.4. This is where using a zsh alias comes in handy.

9. If everything works, then the Bar should be displayed again and nothing should crash. You could also open another terminal, `cd /tmp` and use `ls` to check that `bar.fifo` is created.

10. Any information piped to `/tmp/bar.fifo` will be passed into `printer.coffee`. This file will format the data, such as setting the position, adding background and foreground colors etc. If you need help editing this file, let me know and I'll write you some code.

11. Try running the command `echo 'S15 Dec - 10:57am' > /tmp/bar.fifo`. With any luck you should see the text appear in the bar

### 3. Editing styles

Styles use SASS. You will need to edit them if you want to change the font and colours.

1. Install SASS by following the instructions at http://sass-lang.com/install (bottom right section).

2. Colors, fonts and height are defined in `source/styles/main.scss`.

3. You can also create and edit themes, the default one is `themes/_simple.scss`. 

4. To compile the SASS, use the command `npm run-script css` from the bar folder. This will watch the styles and automatically compile them when you edit them.

5. To refresh the styles that Bar is using, focus on it, and then press the `r` key.

### 4. Tips

1. You can open a developer terminal by pressing `Ctrl-d`.
2. If you accidentally move the Bar from it's position, use the `s` key.
3. If you are editing the SCSS, I suggest you use the html files in `app/tests`. It's much easier to quickly refresh and debug them.

Well that's about it. I'll be glad to answer anymore questions you have.

## Usage

You'll need to download a copy of [node-webkit](https://github.com/rogerwang/node-webkit#downloads).

On OS X with zsh, I added `alias nw="~/Applications/node-webkit.app/Contents/MacOS/node-webkit"` to my .zshrc so I could easily start the app whenever I wanted by:

    cd ~/Projects/Bar
    nw .
    
To close the app, simply focus on it, and press `Cmd + W`. This will automatically shutdown the sockets server as well.

## Configuration

Settings are stored in `source/scripts/config.coffee`. Recompile the application by running `cake build`.

Edit colours and load themes in `source/styles/main.scss`. Recompile the styles by running `npm run-script css`.

## Hiding the menubar

I recommend you use a SIMBL plugin like [Menufela](https://github.com/fjolnir/menufela).

## Multiple Desktops

To show on multiple desktops, right click the dock icon, and select **Options** > **All Desktops**.

## Window Managers

If you use something like Zephyros, then you will be be annoyed when you accidentally move the Bar from it's position. To fix this I added a small `if` statement in my scrip that would ignore windows with height of `< ~30` pixels.
## Shadows

Either use the node-webkit transparency branch, or something like https://github.com/puffnfresh/toggle-osx-shadows

## Rounded corners

Edit SArtFile.bin using https://github.com/alexzielenski/sartFileTool and replace 54-1.png, 56-1.png, 89-1.png and 91-1.png. See [my config files](https://github.com/stayradiated/dotfiles/tree/master/OS%20X%20Theme) for more details.
