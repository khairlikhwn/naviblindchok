export const drawRect = (detections, ctx) => {
  detections.forEach((prediction) => {
    //get pred results
    const [x, y, width, height] = prediction["bbox"];
    const text = prediction["class"];

    //set styling
    const color = "red";
    ctx.strokeStyle = color;
    ctx.font = "18px Arial";
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height);
    ctx.stroke();
    //----------------traffic light color-------------------------//
    if (prediction["class"] == "traffic light") {
      //"traffic light"
      var xmid = x + width / 2;
      var ymid = y + height / 3;
      //visualize where is being evaluated (r/g)
      ctx.beginPath();
      ctx.rect(xmid, ymid, 10, 10);
      ctx.stroke();
      //evaluation
      var imageData = ctx.getImageData(xmid + 5, ymid + 5, 1, 1);
      var pix = imageData.data;
      var red = imageData.data[0];
      var green = imageData.data[1];
      //viewing
      let textContainer2 = document.getElementById("text-container2");
      console.log("Color at point :", pix);
      if (red > green) {
        textContainer2.textContent = "red light";
      } else {
        textContainer2.textContent = "green light";
      }
    }
  });
};
