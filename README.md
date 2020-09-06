# PiTV Alpha V0.1

## Major Update
 This project has just been updated with new features, big fixes, and a new name. The new name for this project is PiTV. It is currenty in Alpha with Version 0.1. This update brings a new feature: Update Checking. Everytime the program runs a command it will make a quick request to the github respoity version.txt file and make sure it matches the current version available on github. If not it will ask you to update PiTV. This version also brings a fix to allow the program to return a string. This means the shortcuts will no longer hang thus, breaking some key functionality. With this new version and new name brings a new install script. Some functionality from the install script has been removed since it did not function properly. I will add this feature back and make sure it works. I also hope to eventually add more tv streaming services.

## About this project
 This project makes your Raspberry Pi into a streaming dongle for a dumb tv or even a Smart TV. When finished this project will allow you speak to any major smart assistant it will pull up any movie, tv show, tv channel or youtube video onto your TV.
 
 ## Currently Supported Streaming Services
  - Youtube (Subscriptions and searching)
  - All services on JustWatch
  - Steam Link (Gaming Streaming)
  - Xfinity Stream
 
 ## How to install
 
 ### Basic Install (w/o Unified Remote Server)
 ### `curl https://raw.githubusercontent.com/jnstockley/PiTV/master/PiTV-basic-install.sh | bash`
 After running this please reboot system!
 
 ### Full Install (w/ Unified Remote Server)
 ### `curl https://raw.githubusercontent.com/jnstockley/PiTV/master/PiTV-full-install.sh | bash `
 After running this please reboot system!
 
 ## Current Limitations
 The only officially supported user-friendly activation method is using Siri Shortcuts. Another way of activation is to use Postman to make GET and POST requests to the server. More activation methods on the way.
 
 ## Features to come
 - Improvements to shortcuts and the ability to get responses
 - Possible web UI
 ✓ Update checker
 
 # Have a feature request or service request?
 If you have a feature request, service request or bugs, please submit them under the issues tab with the correct tag
