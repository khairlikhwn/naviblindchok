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

    let textContainer2 = document.getElementById("text-container2");

    textContainer2.textContent = " ";
    //----------------traffic light color-------------------------//
    if (prediction["class"] == "traffic light") {
      //"traffic light"
      //var xmid = x + width / 2;
      //var ymid = y + height / 3;
      //visualize where is being evaluated (r/g)
      //ctx.beginPath();
      //ctx.rect(xmid, ymid, 10, 10);
      //ctx.stroke();
      //evaluation
      let average_rgb = { r: 0, g: 0, b: 0 };

      var imageData = ctx.getImageData(x, y, width, height);
      var data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        average_rgb.r += data[i];
        average_rgb.g += data[i + 1];
        average_rgb.b += data[i + 2];
      }

      average_rgb.r /= data.length / 4;
      average_rgb.g /= data.length / 4;
      average_rgb.b /= data.length / 4;
      console.log(average_rgb);
      //viewing

      if (average_rgb.r > average_rgb.g) {
        textContainer2.textContent = "red light";
      } else {
        textContainer2.textContent = "green light";
      }
    }
  });
};
