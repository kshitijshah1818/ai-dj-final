song="";
leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;
scoreleftwristy=0;
scorerigthwristy=0;

function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(500,600);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function gotPoses(results){
    if(results.length>0){
    console.log(results);

    scoreleftwristy=results[0].pose.keypoints[9].score;
    console.log("score of left wrist y "+scoreleftwristy);

    scorerigthwristy=results[0].pose.keypoints[10].score;
    console.log("score of right wrist y "+ scorerigthwristy);

    leftwristX=results[0].pose.leftWrist.x;
    leftwristY=results[0].pose.leftWrist.y;
    rightwristX=results[0].pose.rightWrist.x;
    rightwristY=results[0].pose.rightWrist.y;
    console.log('LEFT WRIST X= '+leftwristX + 'LEFT WRIST Y= '+leftwristY);
    console.log('RIGHT WRIST X= '+rightwristX + 'RIGHT WRIST Y= '+rightwristY)
    }
}
function modelLoaded(){
    console.log('poseNet model is loaded');
}

function draw(){
    image(video,0,0,500,600);
    if(scoreleftwristy>0.2){
        fill("#779ad1");
        stroke("#5eb304");
        circle(leftwristX,leftwristY,20);
        numbery=Number(leftwristY);
        floory=floor(numbery);
        volume=floory/500;
        document.getElementById("volume").innerHTML="VOLUME= "+volume;
        song.setVolume(volume);
    }

    fill("#779ad1");
    stroke("#5eb304");

    if(scorerightwristY>0.2){
        circle(rightwristX,rightwristY,20);

        if(rightwristY>0 && rightwristY<=100){
            document.getElementById("speed").innerHTML="SPEED=0.5x";
            song.rate(0.5);
        }
        else if(rightwristY>100 && rightwristY<=200){
            document.getElementById("speed").innerHTML="SPEED=1x";
            song.rate(1);
        }
        else if(rightwristY>200 && rightwristY<=300){
            document.getElementById("speed").innerHTML="SPEED=1.5x";
            song.rate(1.5);
        }
        else if(rightwristY>300 && rightwristY<=400){
            document.getElementById("speed").innerHTML="SPEED=2x";
            song.rate(2);
        }
        else if(rightwristY>400 && rightwristY<=500){
            document.getElementById("speed").innerHTML="SPEED=2.5x";
            song.rate(2.5);
        }
    }

    

}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
