# world-cup-trivia-web

## Installation Instrucions
### 1. Clone the repo

```
cd ~
git clone https://github.com/valenzmanu/world-cup-trivia-web.git
```

### 2. Add automatic start at boot

Edit this file:

```
sudo nano /etc/xdg/lxsession/LXDE-pi/autostart
```

And add this:

```
@xset s off
@xset -dpms
@xset s noblank
@chromium-browser --kiosk ~/world-cup-trivia-web/game.html
```