# PiTV Beta V0.5

## Version 0.5
 I have added a very basic Web UI. The purpose of this is to allow people without an iPhone to use PiTV! To access the web ui go to http://RaspberryPiIp/PiTV/ If you want this web ui you must update using the web install script.

## Video Tutorials
 I have just posted a new video on how to update PiTV as well as an updated version of how to install and run PiTV!

## Autostart and Steam Siri Shortcut
 I have just updated both install scripts to include auto running on start up. You no longer need to run python3 /home/pi/Documents/PiTV/PiTV.py after everyreboot. After installing please reboot your Raspberry Pi to start PiTV. I have also updated the siri shortcuts links to include an updated steam shortcut. The old one would errror out everything.

## Version 0.4, Siri Shortcuts and new Video Tutorial
 I have just released a V0.4. This version fixes a small bug with youtube subscriptions. Also I have created a file with links to all the siri shortucts as well as posted a new video on youtube on how to install and run them.

## Video Tutorial Series
 I have posted my first video on how to install and run PiTV. The youtube playlist, which will contain all my tutorials, is here: https://www.youtube.com/playlist?list=PL9HVBFyPtYs6xoem9jVuysnxfbK7dohKs

## Version 0.3
 This version is a major update!! I have added support for music streaming services. To see a full list of all supported services scroll to the 'Currently Supported Streaming Services Section'. I have also removed some extra code. Also have re-worked how requests are handled. With that last point, the current public Siri Shortcut no longer works with this new version. I will post a new Siri Shortuct ASAP.

## Want a video tutorial?
 I plan on starting to upload video tutorials on how to install and use PiTV. I will upload them on this youtube channel: https://www.youtube.com/channel/UC7qJshvWhYX0Nx1qrI3eu1Q/ 
 I will post an update here whenever I upload a tutorial.

## About this project
 This project makes your Raspberry Pi into a streaming dongle for a dumb tv or even a Smart TV. When finished this project will allow you speak to any major smart assistant it will pull up any movie, tv show, tv channel or youtube video onto your TV.
 
 ## Currently Supported Streaming Services
  - Youtube (Subscriptions and searching)
  - All services on JustWatch
  - Steam Link (Gaming Streaming)
  - Xfinity Stream
  - Twitch.tv
  - Apple Music
  - Spotify
  - Soundcloud
  - Youtube Music
  - Pandora
 
 ## How to install
 
 ### Basic Install (w/o Unified Remote Server)
 ### `curl https://raw.githubusercontent.com/jnstockley/PiTV/master/PiTV-basic-install.sh | bash`
 After running this please reboot the system!
 
 ### Full Install (w/ Unified Remote Server)
 ### `curl https://raw.githubusercontent.com/jnstockley/PiTV/master/PiTV-full-install.sh | bash `
 After running this please reboot the system!
 
  ### Web Install (w/ Unified Remote Server)
 ### `curl https://raw.githubusercontent.com/jnstockley/PiTV/master/PiTV-web-install.sh | bash `
 After running this please reboot the system!
 
 ## How to update
 ### `curl https://raw.githubusercontent.com/jnstockley/PiTV/master/PiTV-update.sh | bash`
 After running this please reboot the system!
 
 ## How to run PiTV
  After running the newest install script reboot your Raspberry Pi and it will start automatically on startup
 
 ## Install and use the Siri Shortcut
 1. Download a shortcut from the link in the Siri Shortcuts file
 2. Click "Get Shortcut"
 3. Once opened, scroll to the bottom and click "Add Untrusted Shortcut"
 4. Once installed edit the shortcut
 5. On the first line in the dictionary change the serverIP value to the IP of your Raspberry Pi
    You can find this by typing ifconfig on your Raspberry Pi's terminal
 6. After that save the shortcut
 7. To run either click on the shortcut or use siri and say the name of the shortcut to activate it
 
 ## Get the full Experience 
  To get the full experience it is recommended that you use the full install script listed above and to download the Unified Remote iOS app onto your device. The app allows you to easily control your raspberry pi from your iOS device without having to have a mouse and keyboard connected to the Pi. To download click this link: https://apps.apple.com/us/app/unified-remote/id825534179
 
 ## Current Limitations
 The only officially supported user-friendly activation method is using Siri Shortcuts. Another way of activation is to use Postman to make GET and POST requests to the server. More activation methods on the way.
 
 ## Features to come
 - ✓ Improvements to shortcuts and the ability to get responses
 - Possible web UI
 - ✓ Update checker
 - Video tutorials (in progress )
 - ✓ Easy and quick update script
 - More user friendly activation methods ie Google Assistant, IFTTT, Alexa
 - ✓ Adding audio streaming services
 - Add poadcast services
 
 # Have a feature request or service request?
 If you have a feature request, service request or bugs, please submit them under the issues tab with the correct tag
