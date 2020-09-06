#!/bin/bash

# Download Basic Installer
curl https://raw.githubusercontent.com/jnstockley/PiTV/master/PiTV-basic-install.sh

# Download optional dependencies
wget -O urserver.deb http://www.unifiedremote.com/d/rpi-deb
sudo dpkg -i urserver.deb

# Start urserver
/opt/urserver/urserver-start
