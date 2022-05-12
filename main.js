prediction_1="";

Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image"src="'+data_uri+'"/>';

    })
}

Classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/X3aDAcvYL/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model LOADED!');
}

function speak(){
    var synth= window.speechSynthesis;
    speak_data = "The Prediction is"+prediction_1;
    var utterThis  = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById("captured_image");
    Classifier.classify(img, gotResults);
}
function gotResults(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction_1= results[0].label;
        
        speak()
        if(prediction_1== "Amazing"){
            document.getElementById("update_emoji").innerHTML ="&#128076;";
            document.getElementById("msg").innerHTML = "Yes, You Are Amazing!";
            document.getElementById("msg").style.backgroundColor ="Green";
        }if(prediction_1== "Best"){
            document.getElementById("update_emoji").innerHTML ="&#128077;";
            document.getElementById("msg").innerHTML ="Weldone You Are the BEST!";
            document.getElementById("msg").style.backgroundColor ="Orange";
        }if(prediction_1== "Victory"){
            document.getElementById("update_emoji").innerHTML ="&#9996;";
            document.getElementById("msg").innerHTML ="God is always with you carry on!";
            document.getElementById("msg").style.backgroundColor ="Indigo"; 
        }
    }
}