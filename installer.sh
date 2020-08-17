#!/bin/bash
# Update system
sudo apt update
# Install major dependencies
sudo apt install python3 steamlink
# Install python dependencies
pip3 install pynput
#Install media chromium
curl -fsSL https://pi.vpetkov.net -o ventz-media-pi
sh ventz-media-pi
# Download python script
mkdir /home/pi/Documents/smarttv
cd /home/pi/Documents/smarttv
wget https://raw.githubusercontent.com/jnstockley/raspberrypi-smart-tv/master/app.py
# Auto run pyhton script
mkdir /home/pi/.config/autostart || echo "Auto start already exists"
echo "[Desktop Entry]
Type= Application
Name= Smart TV
Exec /usr/bin/python3 /home/pi/Documents/smarttv/app.pv
" >> /home/pi/.config/autostart/smarttv.desktop
