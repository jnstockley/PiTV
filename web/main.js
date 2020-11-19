var ip = "";
function next(){
    ip = prompt("Please enter the Raspbery Pi's IP address", "10.0.0.18");
    if(document.getElementById("music").checked){
        service = prompt("Please enter a music streaming service.","");
        music = prompt("Please enter what you want to stream from " + service, "");
        var json = '{"service": "' + service + '", "music": "' + music + '"}'
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://" + ip + ":8080/music", true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(json);
    }else if(document.getElementById("video").checked){
        service = prompt("Please enter a video streaming service.","");
        video = prompt("Please enter what you want to stream from " + service, "");
        var json = '{"service": "' + service + '", "video": "' + video + '"}'
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://" + ip + ":8080/video", true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(json);
    }else if(document.getElementById("game").checked){
		service = prompt("Please enter a game streaming service.","")
		var json = '{"service": "' + service +'"}'
		
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://' + ip + ':8080/game');
		xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(json); 
        alert( service + " is launching");
    }else if(document.getElementById("quit").checked){
        let xhr = new XMLHttpRequest();
        xhr.open('get', 'http://' + ip + ':8080/quit');
        xhr.send(); 
        alert("All applications quit!");
    }else{
        alert("Please select at least one option!");
    }
}

