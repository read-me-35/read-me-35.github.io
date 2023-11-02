/* eslint-disable no-unused-vars */
import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";
//import { calculateResult } from "../../processing.js";
import sample_pos from "../../assets/sample_pos.png";
import sample_neg from "../../assets/sample_neg.png";
import sample_inv from "../../assets/sample_inv.png";

import * as tf from "@tensorflow/tfjs";
import React from "react";
import {
  getModel,
  convertBase64ToTensor,
  startPrediction,
} from "../../helpers/tensor-helper";

function Camera() {
  // the link to your model provided by Teachable Machine export panel
  const URL = "https://teachablemachine.withgoogle.com/models/VE_WTQuBT/";
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  let labelContainer;
  let [model, setModel] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const flip = true;
  const [webcam, setWebCam] = useState(new tmImage.Webcam(300, 300, flip));
  //const [isCamOn, setCamOn] = useState(false);

  // Load the image model and setup the webcam
  async function init() {
    model = await tmImage.load(modelURL, metadataURL);
    await webcam.setup();
    openCamera();
    document.getElementById("webcam-container").appendChild(webcam.canvas);
  }

  async function openCamera() {
    await webcam.play();
    window.requestAnimationFrame(loop);
    //setCamOn(true); // this line causes an error sometimes for some reason
  }

  async function takePicture() {
    setImgSrc(webcam.canvas.toDataURL("image/jpeg"));
    getPrediction();
  }

  async function tryAgain() {
    setImgSrc(null);
    webcam.pause();
    //setCamOn(false);
  }

  async function loop() {
    webcam.update(); // update the webcam frame
    window.requestAnimationFrame(loop);
  }

  // run the webcam image through the image model
  async function getPrediction() {
    const prediction = await model.predict(webcam.canvas);
    let results = [];
    //for each prediction put in a dictionary and sort
    for (let i = 0; i < prediction.length; i++) {
      const x = prediction[i].probability.toFixed(2) * 100;
      x.toFixed(2);
      results[prediction[i].className] = x;
    }

    results = Object.entries(results).sort((a, b) => b[1] - a[1]);
    console.log(results);

    //for each entry, create a new html element and append to the label container
    for (let i = 0; i < results.length; i++) {
      const entry = document.createElement("h2");
      if (i === 0) {
        entry.classList.add("text-white", "font-bold");
      } else {
        entry.classList.add("text-white");
      }

      entry.innerHTML = `${results[i][0]}: ${results[i][1]}%`;
      document.getElementById("results-list").appendChild(entry);
    }
  }

  return (
    <div className="flex w-screen h-screen justify-center items-center flex gap-4 flex-col">
      <div className="image-container border-slate-700 border-4 rounded-lg">
        {imgSrc ? (
          <img
            id="img_src"
            src={imgSrc}
            alt="taken_image"
            width="300"
            height="300"
          />
        ) : (
          <div id="webcam-container"></div>
        )}
      </div>
      <div className="">
        {imgSrc ? (
          <button
            className="btn text-black border-transparent rounded-md bg-yellow-400  px-4 py-2"
            onClick={tryAgain}
          >
            Retake photo
          </button>
        ) : (
          <div className="flex gap-2 flex-col">
            <button
              className={`btn text-black border-transparent rounded-md bg-blue-400  px-4 py-2 `}
              onClick={init}
            >
              Open Webcam
            </button>
            <button
              className={`btn text-black border-transparent rounded-md bg-green-400 px-4 py-2`}
              onClick={takePicture}
            >
              Take Picture
            </button>
          </div>
        )}
      </div>

      {imgSrc ? (
        <div
          id="results-list"
          className="border-2 border-grey-700 rounded-lg p-6 mt-4"
        ></div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Camera;
