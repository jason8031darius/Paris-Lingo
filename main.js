music="";
music2="";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
songname = "";


function preload(){
    music2 = loadSound("music2.mp3");
    music = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet is Initialized")
}

function draw(){
    image(video, 0, 0 ,600 , 500);

    fill("#00ff00");
    stroke("#ff0000");

    songname = music2.isPlaying();
    console.log(songname);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        music2.stop();
        if(songname == false){
            music.play();
        }
        console.log("Song Name: Peter Pan");
            document.getElementById("song_id").innerHTML = "Song Name: Peter Pan";
    }
}
function gotPoses(results){
    if(results.length > 0){
    console.log(results);

    
         
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = "+leftWristX+" leftWristY = "+leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = "+rightWristX+" rightWristY = "+rightWristY);

    
    scoreleftWrist = results[0].pose.keypoints[9].score;
    console.log(scoreleftWrist);
    }
}
