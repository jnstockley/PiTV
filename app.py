from flask import Flask, request
import subprocess
import os
from pynput.keyboard import Key, Controller

app = Flask(__name__)

@app.route('/youtube', methods=['POST'])
def youtube():
    baseURl = "https://www.youtube.com/results?search_query="
    unprocessed = request.get_json()["url"]
    processed = unprocessed.replace(" ", "+")
    url = baseURl+processed
    subprocess.call(["chromium-browser", '--user-agent="Mozilla/5.0 (X11; CrOS armv7l 12371.89.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36"', url])
    return "OK"

@app.route('/subscriptions', methods=['GET'])
def ytSubscriptions():
    url = "https://www.youtube.com/feed/subscriptions"
    subprocess.call(["chromium-browser", '--user-agent="Mozilla/5.0 (X11; CrOS armv7l 12371.89.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36"', url])
    return "OK"

@app.route('/steam', methods=['GET'])
def games():
    os.system("steamlink")
    return "OK"

@app.route('/quit', methods=['GET'])
def stop():
    keyboard = Controller()
    os.system("pkill chromium-browse")
    keyboard.press(Key.esc)
    keyboard.release(Key.esc)
    return "Go and relax!"

@app.route('/stream', methods=['POST'])
def stream():
    baseURL = "https://www.justwatch.com/us/search?q="
    unprocessed = request.get_json()["url"]
    processed = unprocessed.replace(" ", "%20")
    url = baseURL+processed
    subprocess.call(["chromium-browser", '--user-agent="Mozilla/5.0 (X11; CrOS armv7l 12371.89.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36"', url])
    return "OK"

@app.route('/tv', methods=['POST'])
def tv():
    baseURL = "https://www.xfinity.com/stream/search?q="
    unprocessed = request.get_json()["url"]
    processed = unprocessed.replace(" ", "%20")
    url = baseURL+processed
    subprocess.call(["chromium-browser", '--user-agent="Mozilla/5.0 (X11; CrOS armv7l 12371.89.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36"', url])
    return "OK"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
