#!/bin/bash

#Update System
sudo apt update && sudo apt upgrade -y

# Change directory into PiTV folder, remove old version, and download new version
cd /home/pi/Documents/PiTV
rm PiTV.py
wget https://raw.githubusercontent.com/jnstockley/PiTV/master/PiTV.py
cd ~
echo "PiTV has been updated! Please reboot your Raspberry Pi to finish update!"
