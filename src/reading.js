export const readObj = (detections, ctx) => {
  detections.forEach((prediction) => {
    //get pred results
    const [x, y, width, height] = prediction["bbox"];
    const text = prediction["class"];
    //console.log(prediction["class"]);

    //start reading
    let utterance = new SpeechSynthesisUtterance(prediction["class"]);
    speechSynthesis.speak(utterance);
    //speaking the position
    if (x < 320) {
      let utterance = new SpeechSynthesisUtterance("on your right");
      speechSynthesis.speak(utterance);
    }

    if (x > 320) {
      let utterance = new SpeechSynthesisUtterance("on your left");
      speechSynthesis.speak(utterance);
    }
    //--------------------------------------------------------------------------------------
  });
};
