status = "";
objects2 = [];

function preload(){
    img = loadImage("bedroom.jpg");
}

function setup(){
    canvas = createCanvas(640 , 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Detecting objects.";
}

function modelLoaded(){
    console.log("model Loaded");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error,results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects2 = results;

}

function draw() {
    image(img, 0, 70, 639, 350);
        if(status != "")
        {
          objectDetector.detect(video, gotResult);
          for (i = 0; i < objects2.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("detected").innerHTML = "Objects detected are : "+ objects2[i].label;
   
            fill("#FF0000");
            percent = floor(objects2[i].confidence * 100);
            text(objects2[i].label + " " + percent + "%", objects2[i].x + 15, objects2[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects2[i].x, objects2[i].y, objects2[i].width, objects2[i].height);
          }
    }   
  }
  