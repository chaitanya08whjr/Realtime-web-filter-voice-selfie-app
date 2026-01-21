nosex = 0;
nosey = 0;

function preload(){
   mustache= loadImage("https://i.postimg.cc/PqjZSvCH/mustache.png");
}

function setup(){
canvas = createCanvas(300, 300);
canvas.center();
video = createCapture(VIDEO);
video.hide();
video.size(250, 300);
poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}

Webcam.set({
    width: 1, 
    height: 1,
    image_format: 'jpeg',
    jpeg_quality: 90,
  
});

function draw(){
image(video, 0, 0, 290, 300 );
image(mustache, nosex, nosey, 50, 50);
}

function modelLoaded(){
   console.log("POSEnet run run");
}

function gotPoses(result){
   if(result.length>0){
      console.log(result);
      nosex = result[0].pose.nose.x;
      nosey = result[0].pose.nose.y;
   }
}



var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}
recognition.onresult = function (event) {
    console.log(event);
    var Content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML = Content;
    console.log(Content);
    if (Content == "take my selfie") {
        speak();
    }

}



function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "taking your selfie in 5 seconds";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    // Use the library's attach method directly, referencing the ID of the HTML element.
    Webcam.attach('#camera'); // Assuming 'camera' is the ID of the div/video element
    setTimeout(function() { take_snapshot(); save(); }, 5000);
}

// The 'camera' variable here is likely meant to be the HTML element itself,
// but the library's attach method usually takes the ID string.
// If 'camera' was intended to be the library's object, it should be assigned.
// For consistency and correctness with webcam.js, we will use 'Webcam' globally.
var cameraElement = document.getElementById("camera"); // Rename to avoid confusion if 'camera' is used elsewhere.


function take_snapshot() {
   // Call snap on the globally available Webcam object
   Webcam.snap(function (data_uri) {

    });
}

function save() {
    link = document.getElementById("link");
    image = document.getElementById("selfie_image").src;
    link.href = image;
    link.click();
}

function back() {
      window.location = "main_page.html";
}
