#!/bin/bash

# Update system
sudo apt update && sudo apt upgrade -y

# Install major dependencies
sudo apt install python3 steamlink

# Install python dependencies
pip3 install pynput
pip3 install  flask
pip3 install urllib

#Install media chromium
curl -fsSL https://pi.vpetkov.net -o ventz-media-pi
sh ventz-media-pi

# Download python script
mkdir /home/pi/Documents/PiTV
cd /home/pi/Documents/PiTV
wget https://raw.githubusercontent.com/jnstockley/PiTV/master/PiTV.py

# Notify user how to run script (temp)
echo "To run type python3 /home/pi/Documents/PiTV/PiTV.py"

# Auto run pyhton script
#mkdir /home/pi/.config/autostart || echo "Auto start already exists"
#echo "[Desktop Entry]
#Type= Application
#Name= Smart TV
#Exec /usr/bin/python3 /home/pi/Documents/smarttv/app.pv
#" >> /home/pi/.config/autostart/smarttv.desktop

