from flask import Flask, jsonify, request
import subprocess
import os
import webbrowser
import json

app = Flask(__name__)


@app.route('/', methods=['POST'])
def hello_world():
    url = request.get_json()
    data = url["url"]
    #webbrowser.open("google.com")
    #subprocess.call(["chromium-browser"])
    return "OK"

@app.route('/youtube', methods=['POST'])
def youtube():
    baseURl = "https://www.youtube.com/results?search_query="
    unprocessed = request.get_json()["url"]
    processed = unprocessed.replace(" ", "+")
    url = baseURl+processed
    #webbrowser.open(url)
    subprocess.call(["chromium-browser", '%U --user-agent="Mozilla/5.0 (X11; CrOS armv7l 12371.89.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36"', url])
    return "OK"

@app.route('/subscriptions', methods=['GET'])
def ytSubscriptions():
    url = "https://www.youtube.com/feed/subscriptions"
    subprocess.call(["chromium-browser", '%U --user-agent="Mozilla/5.0 (X11; CrOS armv7l 12371.89.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36"', url])
    return "OK"

@app.route('/steam', methods=['GET'])
def games():
    os.system()
    return "OK"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
