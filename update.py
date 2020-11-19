#Made by: Jack Stockley

#Program imports
import os

#System update of Pi
def osUpdate():
    os.system("sudo apt update && sudo apt upgrade -y")

#Updates PiTV
def updatePiTV():
    os.system("rm /home/pi/PiTV/PiTV.py")
    os.system("wget https://raw.githubusercontent.com/jnstockley/PiTV/master/PiTV.py")
    os.system("mv /home/pi/PiTV.py /home/pi/PiTV/")

#Checks for webUI and if found updates it
def updateWebUI():
    webFolder = os.popen("ls /var/www/html/").read()
    if("PiTV" in webFolder):
        os.system("rm /var/www/html/PiTV/main.js")
        os.system("rm /var/www/html/PiTV/index.html")
        os.system("wget https://raw.githubusercontent.com/jnstockley/PiTV/master/web/main.js")
        os.system("wget https://raw.githubusercontent.com/jnstockley/PiTV/master/web/index.html")
        os.system("mv /home/pi/main.js /var/www/html/PiTV/")
        os.system("mv /home/pi/index.html /var/www/html/PiTV/")

#Prompts for reboot
def reboot():
    rebootNow = input("Would you like to reboot your Raspberry Pi now? (Y/N): ")
    if("y" in rebootNow or "Y" in rebootNow):
        os.system("sudo reboot")
    else:
        print("Please reboot your Pi before running PiTV!")
    
#Removes update script
def clean():
    os.system("rm /home/pi/update.py")

#Runs the program
if __name__ == '__main__':
    osUpdate()
    updatePiTV()
    updateWebUI()
    clean()
    reboot()
