#!/bin/bash

#Update System
sudo apt update && sudo apt upgrade -y

# Change directory into PiTV folder, remove old version, and download new version
cd /home/pi/Documents/PiTV
rm PiTV.py
wget https://raw.githubusercontent.com/jnstockley/PiTV/master/PiTV.py
cd ~

#New dependencie in new version
pip3 install -U flask_cors

echo "PiTV has been updated! Please reboot your Raspberry Pi to finish update!"
