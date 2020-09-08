# Made by: Jack Stockley

# Program imports
from flask import Flask, request
import subprocess
from pynput.keyboard import Key, Controller
import os
import urllib.request, json

#Setup flask
app = Flask(__name__)

#Global variables
chrome = "chromium-browser"
flags = '--user-agent="Mozilla/5.0 (X11; CrOS armv7l 12371.89.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36"'
currentVersion = 0.2

# Launches chrome with special flags and searches youtube for request search item
@app.route('/youtube', methods = ['POST'])
def youtube():
    baseURl = "https://www.youtube.com/results?search_query="
    unprocessed = request.get_json()["url"]
    processed = unprocessed.replace(" ", "+")
    url = baseURl + processed
    subprocess.Popen([chrome, flags, url])
    return "Searching youtube for " + unprocessed

# Launches chrome with special flags and loads users youtube subscriptions
@app.route('/subscriptions')
def subscription():
    url = "https://www.youtube.com/feed/subscriptions"
    subprocess.Popen([chrome, flags, url])
    return "Loading your youtube subscriptions!"

# Launches steam link
@app.route('/steam')
def steam():
    subprocess.Popen("steamlink")
    return "Launching Steam Link!"

# Lauches chrome with special flags and loads xfinity stream for live tv
@app.route('/xfinity', methods = ['POST'])
def xfinity():
    baseURL = "https://www.xfinity.com/stream/search?q="
    unprocessed = request.get_json()["url"]
    processed = unprocessed.replace(" ", "%20")
    url = baseURL + processed
    subprocess.Popen([chrome, flags, url])
    return "Launching Xfinity Steam. Enjoy " + unprocessed

# Lauches chrome with special flags and loads justwatch.com to allow the user to select a show/movie to watch
@app.route('/stream', methods = ['POST'])
def stream():
    baseURL = "https://www.justwatch.com/us/search?q="
    unprocessed = request.get_json()["url"]
    processed = unprocessed.replace(" ", "%20")
    url = baseURL + processed
    subprocess.Popen([chrome, flags, url])
    return "Searching justwatch.com for " + unprocessed + ". Enjoy!"

# Kills all the tasks that could be launched by PiTV
@app.route('/quit')
def quit():
    keyboard = Controller()
    os.system("pkill chromium-browse")
    keyboard.press(Key.esc)
    keyboard.release(Key.esc)
    return "All tasks closed!"

# Reads a file from github and checks the current version with the version stored on github
def update():
    url = 'https://raw.githubusercontent.com/jnstockley/raspberrypi-smart-tv/master/version.txt'
    with urllib.request.urlopen(url) as url:
        data = json.loads(url.read().decode())
        latestVersion = data
    if(float(latestVersion) > currentVersion):
        return True
    else:
        return False

# Checks to see if there is a newer version of PiTV on the github repository
@app.route('/update')
def test():
    if(update()):
        return "Please update PiTV!", 500
    else:
        return "Up to date!"

## Runs the program
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)