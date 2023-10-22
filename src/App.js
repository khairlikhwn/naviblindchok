// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
// 1. TODO - Import required model here
import * as cocossd from "@tensorflow-models/coco-ssd";
// e.g. import * as tfmodel from "@tensorflow-models/tfmodel";
import Webcam from "react-webcam";
import "./App.css";
// 2. TODO - Import drawing utility here
import { drawRect } from "./utilities";
//import { colorRect } from "./text";
// e.g. import { drawRect } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network
    // e.g. const net = await cocossd.load();
    const net = await cocossd.load();

    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 1000);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

      // 4. TODO - Make Detections
      // e.g. const obj = await net.detect(video);
      const obj = await net.detect(video);
      console.log(obj);

      const NameArray = obj.map((obj) => obj.class);
      const RawPosArray = obj.map((obj) => obj.bbox);
      console.log(NameArray);
      console.log(RawPosArray);

      const PosXvalues = RawPosArray.map((list) => list[0]);
      const PosYvalues = RawPosArray.map((list) => list[1]);
      const PosWvalues = RawPosArray.map((list) => list[3]);
      const PosHvalues = RawPosArray.map((list) => list[2]);

      const RealPos = [];
      //for testing if we get number
      PosXvalues.forEach((PosXvalues, index) => {
        if (
          typeof PosXvalues !== "number" ||
          typeof PosWvalues[index] !== "number"
        ) {
          console.error(
            "Invalid value detected. Both values should be numbers."
          );
          return;
        }

        //
        let position = (PosXvalues + PosWvalues[index]) / 2;
        //console.log(position);
        if (position <= videoWidth / 2 - 100) {
          RealPos.push("on your right");
        } else {
          RealPos.push("on your left");
        }
      });

      console.log(RealPos);

      let result = NameArray.map((item, index) => {
        return [item, RealPos[index]];
      });

      //console.log(result);

      document.addEventListener("keydown", function (event) {
        if (event.key === "e") {
          let utterance1 = new SpeechSynthesisUtterance(result);
          speechSynthesis.speak(utterance1);
        }
      });

      // Draw mesh

      // 5. TODO - Update drawing utility
      drawRect(obj, ctx);

      // show user
      let textContainer = document.getElementById("text-container");
      textContainer.textContent = result;

      //stop speking hereeee
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
        <div id="text-container"></div>
        <div id="text-container2"></div>
      </header>
    </div>
  );
}

export default App;
