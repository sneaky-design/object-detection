status = "";
objects = [];

function preload(){
    img = loadImage("fruit bowl.jfif");
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
    objects = results;

}

function draw() {
    image(img, 0, 70, 639, 350);
        if(status != "")
        {
          objectDetector.detect(video, gotResult);
          for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("detected").innerHTML = "Objects detected are : "+ objects[i].label;
   
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
          }
    }   
  }
