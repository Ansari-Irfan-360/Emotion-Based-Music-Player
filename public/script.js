const video = document.getElementById("video");

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models"),
]).then(startVideo);

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    (stream) => (video.srcObject = stream),
    (err) => console.error(err)
  );
}

// You can change the song by :- Download the song -> move the song to "songs" folder -> edit the name of the song in the audio url after songs folder ("./songs/{name of the song file}") 
var angrySong = new Audio("./songs/[Angry] Bekhayali.mp3");
var happySong = new Audio("./songs/[Happy] Badtameez Dil.mp3");
var sadSong = new Audio("./songs/[Sad] Tum Hi Ho.mp3");
var neutralSong = new Audio("./songs/[Neutral] Lag Jaa Gale.mp3");
var surprisedSong = new Audio("./songs/[Surprised] Theher Ja.mp3");

var prevKey = 0;
video.addEventListener("play", () => {
  // 
  const canvas = faceapi.createCanvasFromMedia(video);
  document.querySelector('main').append(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    var maxValue = 0;
    var maxKey = "none";
    for (var key in detections[0].expressions) {
      if (key === "asSortedArray") {
        continue;
      }
      if (detections[0].expressions[key] > maxValue) {
        maxValue = detections[0].expressions[key];
        maxKey = `${key}`;
      }
    }
    

    if(prevKey != maxKey){    
      
      switch (prevKey) {
        case "sad":
          sadSong.pause();
          break;
        case "happy":
          happySong.pause();
          break;
        case "neutral":
          neutralSong.pause();
          break;
        case "angry":
          angrySong.pause();
          break;
        case "surprised":
          surprisedSong.pause();
          break;
        default:
      }
    }
    switch (maxKey) {
      case "sad":
        sadSong.play();
        break;
      case "happy":
        happySong.play();
        break;
      case "neutral":
        neutralSong.play();
        break;
      case "angry":
        angrySong.play();
        break;
      case "surprised":
        surprisedSong.play();
        break;
      default:
    }
    prevKey = maxKey;


    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    
    // This shows the Square around the face (Face detector with accuracy)
    faceapi.draw.drawDetections(canvas, resizedDetections);

    // This shows the facial marks
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

    // This shows the emotion below the face
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    // This number indicates the interval of the program on detect the emotion (in miliseconds [100ms = 0.1s])
  }, 100);
});
