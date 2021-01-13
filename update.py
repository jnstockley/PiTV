# Made by: Jack Stockley

# Program imports
import os
import fileinput
import json


# System update of Pi
def osUpdate():
    os.system("sudo apt update && sudo apt upgrade -y")


# Updates PiTV
def updatePiTV():
    os.system("rm /home/pi/PiTV/PiTV.py")
    os.system("wget https://raw.githubusercontent.com/jnstockley/PiTV/master/PiTV.py")
    os.system("mv /home/pi/PiTV.py /home/pi/PiTV/")


# Checks for webUI and if found updates it
def updateWebUI():
    webFolder = os.popen("ls /var/www/html/").read()
    if ("PiTV" in webFolder):
        os.system("rm /var/www/html/PiTV/main.js")
        os.system("rm /var/www/html/PiTV/index.html")
        os.system("wget https://raw.githubusercontent.com/jnstockley/PiTV/master/web/main.js")
        os.system("wget https://raw.githubusercontent.com/jnstockley/PiTV/master/web/index.html")
        os.system("mv /home/pi/main.js /var/www/html/PiTV/")
        os.system("mv /home/pi/index.html /var/www/html/PiTV/")

# Checks for screensaver and if installed copies settings data to new file and updates screensaver
def updateScreensaver():
    os.system("wget https://raw.githubusercontent.com/jnstockley/PiTV/master/screensaver/index.html")
    os.system("wget https://raw.githubusercontent.com/jnstockley/PiTV/master/screensaver/script.js")
    os.system("wget https://raw.githubusercontent.com/jnstockley/PiTV/master/screensaver/settings.json")
    os.system("wget https://raw.githubusercontent.com/jnstockley/PiTV/master/screensaver/style.css")
    webFolder = os.popen("ls /var/www/html").read()
    if("screensaver" in webFolder):
        settingsFile = json.load(open("/var/www/html/screensaver/settings.json"))
        if("version" in os.popen(("cat /var/www/html/screensaver/settings.json")).read()):
            version = settingsFile['version']
            if(version == '1.0'):
                city = settingsFile['weather']['city']
                state = settingsFile['weather']['state']
                unit = settingsFile['weather']['tempUnit']
                weatherKey = settingsFile['keys']['openweather']
                pexelsKey = settingsFile['keys']['pexels']
                newsKey = settingsFile['keys']['news']
                stocksKey = settingsFile['keys']['stocks']
                funFacts = settingsFile['sections']['funfacts']
                weather = settingsFile['sections']['weather']
                dateTime = settingsFile['sections']['dateTime']
                news = settingsFile['sections']['news']
                stocks = settingsFile['sections']['stocks']
                stocksSymbols = str(settingsFile['stocks'])
                dateFormat = settingsFile['dateTime']['dateFormat']
                militaryTime = settingsFile['dateTime']['24hrTime']
                with fileinput.FileInput('/home/pi/settings.json', inplace=True) as file:
                    for line in file:
                        print(line.replace("CITY_NAME", city), end='')
                with fileinput.FileInput('/home/pi/settings.json', inplace=True) as file:
                    for line in file:
                        print(line.replace("STATE_NAME", state), end='')
                with fileinput.FileInput('/home/pi/settings.json', inplace=True) as file:
                    for line in file:
                        print(line.replace("TEMP_UNIT", unit), end='')
                with fileinput.FileInput('/home/pi/settings.json', inplace=True) as file:
                    for line in file:
                        print(line.replace("OPENWEATHER_API_KEY", weatherKey), end='')
                with fileinput.FileInput('/home/pi/settings.json', inplace=True) as file:
                    for line in file:
                        print(line.replace("PEXELS_API_KEY", pexelsKey), end='')
                with fileinput.FileInput('/home/pi/settings.json', inplace=True) as file:
                    for line in file:
                        print(line.replace("NEWS_API_KEY", newsKey), end='')
                with fileinput.FileInput('/home/pi/settings.json', inplace=True) as file:
                    for line in file:
                        print(line.replace("STOCKS_API_KEY", stocksKey), end='')
                with fileinput.FileInput('/home/pi/settings.json', inplace=True) as file:
                    for line in file:
                        print(line.replace("topLeft", funFacts), end='')
                with fileinput.FileInput('/home/pi/settings.json', inplace=True) as file:
                    for line in file:
                        print(line.replace("topRight", weather), end='')
                with fileinput.FileInput('/home/pi/settings.json', inplace=True) as file:
                    for line in file:
                        print(line.replace("bottomRight", dateTime), end='')
                with fileinput.FileInput('/home/pi/settings.json', inplace=True) as file:
                    for line in file:
                        print(line.replace("\"news\": \"none\",", "\"news\": \""+ news + "\","), end='')
                with fileinput.FileInput('/home/pi/settings.json', inplace=True) as file:
                    for line in file:
                        print(line.replace("\"stocks\": \"none\",", "\"stocks\": \""+ stocks + "\","), end='')
                with fileinput.FileInput('/home/pi/settings.json', inplace=True) as file:
                    for line in file:
                        print(line.replace("\"stocks\": [],", "\"stocks\": "+ stocksSymbols + ","), end='')
                with fileinput.FileInput('/home/pi/settings.json', inplace=True) as file:
                    for line in file:
                        print(line.replace("mmmdd,yyyy", dateFormat), end='')
                with fileinput.FileInput('/home/pi/settings.json', inplace=True) as file:
                    for line in file:
                        print(line.replace("false", militaryTime), end='')

                os.system("rm -r /var/www/html/screensaver")
            else:
                print("Unknonw Settings Version Number")
        else:
            city = settingsFile['city']
            state = settingsFile['state']
            unit = settingsFile['tempUnit']
            openWeather = settingsFile['keys']['openweather']
            pexels = settingsFile['keys']['pexels']
            with fileinput.FileInput('/home/pi/settings.json', inplace=True) as file:
                for line in file:
                    print(line.replace("CITY_NAME", city), end='')
            with fileinput.FileInput('/home/pi/settings.json', inplace=True) as file:
                for line in file:
                    print(line.replace("STATE_NAME", state), end='')
            with fileinput.FileInput('/home/pi/settings.json', inplace=True) as file:
                for line in file:
                    print(line.replace("TEMP_UNIT", unit), end='')
            with fileinput.FileInput('/home/pi/settings.json', inplace=True) as file:
                for line in file:
                    print(line.replace("OPENWEATHER_API_KEY", openWeather), end='')
            with fileinput.FileInput('/home/pi/settings.json', inplace=True) as file:
                for line in file:
                    print(line.replace("PEXELS_API_KEY", pexels), end='')
            os.system("rm -r /var/www/html/screensaver")
    os.system("mkdir /var/www/html/screensaver")
    os.system("mv /home/pi/index.html /var/www/html/screensaver")
    os.system("mv /home/pi/script.js /var/www/html/screensaver")
    os.system("mv /home/pi/settings.json /var/www/html/screensaver")
    os.system("mv /home/pi/style.css /var/www/html/screensaver")

# Prompts for reboot
def reboot():
    rebootNow = input("Would you like to reboot your Raspberry Pi now? (Y/N): ")
    if ("y" in rebootNow or "Y" in rebootNow):
        os.system("sudo reboot")
    else:
        print("Please reboot your Pi before running PiTV!")


# Removes update script
def clean():
    os.system("rm /home/pi/update.py")


# Runs the program
if __name__ == '__main__':
    osUpdate()
    updatePiTV()
    updateWebUI()
    updateScreensaver()
    clean()
    reboot()
