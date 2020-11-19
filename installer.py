# Made by: Jack Stockley

#Installer Imports
import os

#System update of Pi
def updatePi():
    os.system("sudo apt update && sudo apt upgrade -y")

#Install required dependencies
def dependencies():
    os.system("sudo apt install python3 steamlink -y")

#Install python dependencies
def pythonDependencies():
    os.system("pip3 install pynput flask")
    os.system("pip3 install -U flask_cors")

#Install media browser
def mediaBrowser():
    os.system("curl -fsSL https://pi.vpetkov.net -o ventz-media-pi")
    os.system("sh ventz-media-pi")

#Install PiTV
def installPiTV():
    os.system("mkdir /home/pi/PiTV")
    os.system("wget https://raw.githubusercontent.com/jnstockley/PiTV/master/PiTV.py")
    os.system("mv /home/pi/PiTV.py /home/pi/PiTV")

#Install Uified Remote Server (if selected)
def urServerInstall():
    os.system("cd ~")
    os.system("wget -O urserver.deb http://www.unifiedremote.com/d/rpi-deb")
    os.system("sudo dpkg -i urserver.deb")

#Run Uified Remote Server (if selected)
def runUrserver():
    os.system("/opt/urserver/urserver-start")

#Install Parsec Gaming (if selected and supported)
def parsecInstall():
    piV = os.popen("cat /proc/cpuinfo | grep Model").read()
    if("Pi 4" not in piV):
        os.system("wget https://s3.amazonaws.com/parsec-build/package/parsec-rpi.deb")
        os.system("sudo dpkg -i parsec-rpi.deb")
    else:
        print("Parsec is not yet supported on your Raspberry Pi!")

#Install basic webUI (if selected)
def webUIInstall():
    os.system("sudo apt install apache2 -y")
    os.system("sudo chown pi:pi /var/www/html/")
    os.system("mkdir /var/www/html/PiTV/")
    os.system("wget https://raw.githubusercontent.com/jnstockley/PiTV/master/web/main.js")
    os.system("wget https://raw.githubusercontent.com/jnstockley/PiTV/master/web/index.html")
    os.system("mv /home/pi/index.html /var/www/html/PiTV")
    os.system("mv /home/pi/main.js /var/www/html/PiTV")

#Make PiTV start on boot
def autoStart():
    os.system("mkdir /home/pi/.config/autostart || echo 'Autostart folder exists'")
    os.system('echo "[Desktop Entry]\n\
Type=Application\n\
Name=PiTV\n\
Exec=/usr/bin/python3 /home/pi/PiTV/PiTV.py\
    " >> /home/pi/.config/autostart/PiTV.desktop')

#Clean up uneeded files
def cleanUp():
    os.system("rm /home/pi/urserver.deb")

#Prompt for reboot
def reboot():
    reboot = input("Would you like to reboot now? (Y/N): ")
    if("y" in reboot or "Y" in reboot):
        os.system("sudo reboot")
    else:
        print("Please reboot your Raspberry Pi before runnig PiTV!")

#Runs the program
if __name__ == '__main__':
    urserver = input("Do you want to install Unified Remote Server? (Y/N): ")
    webUI = input("Do you want to install the Web UI? (Y/N): ")
    parsec = input("Do you want to install Parsec? (Pi 3 supported only) (Y/N): ")
    updatePi()
    dependencies()
    pythonDependencies()
    mediaBrowser()
    installPiTV()
    if("y" in parsec or "Y" in parsec):
        parsecInstall()
    if("y" in urserver or "Y" in urserver):
        urServerInstall()
    if("y" in webUI or "Y" in webUI):
        webUIInstall()
    autoStart()
    if("y" in urserver or "Y" in urserver):
        runUrserver()
    cleanUp()
    reboot()