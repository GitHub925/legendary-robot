var video;
var stat=""
var objects=[]

function setup(){
    canvas=createCanvas(380, 280);
    canvas.center()
    video=createCapture(VIDEO);
    video.hide();
    
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects"
}
 function modelLoaded(){
     console.log("modelloaded")
     stat="true"

 }

 function gotResult(error, results){
     if(error){
         console.log(error);
         alert("Hey there! Sorry about that! Ira Wheera Industries is experiencing a few tech issues. Don't worry, though! Our tech team is hot on the job. Please try again in a few minutes, please. Thanks so much, from Ira Wheera Industries.")
     }
     else{
         console.log(results);
        objects=results;
        
     }
 }
function draw(){
    image(video, 0, 0, 380, 280);

    if(stat != ""){
        r=random(255);
        g=random(255);
        b=random(255);
     objectDetector.detect(video, gotResult);
    document.getElementById('objectnum').innerHTML="Number of Objects:" + objects.length;
        for(i=0; i<objects.length; i++){
        document.getElementById("status").innerHTML ="Status: Objects Detected";
        fill(r,g,b);
        percent=floor(objects[i].confidence * 100)
        text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y );
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }

    }
}