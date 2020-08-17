#!/bin/bash

# Check for updates
sudo apt update

# Run full installer
curl https://raw.githubusercontent.com/jnstockley/raspberrypi-smart-tv/master/basic-installer.sh | bash

# Download optional dependencies
wget -O urserver.deb http://www.unifiedremote.com/d/rpi-deb
sudo dpkg -i urserver.deb

# Start urserver
/opt/urserver/urserver-start
