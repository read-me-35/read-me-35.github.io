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
  // More API functions here:
  // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

  // the link to your model provided by Teachable Machine export panel
  const URL = "https://teachablemachine.withgoogle.com/models/VE_WTQuBT/";

  let model, webcam, labelContainer, maxPredictions;

  // Load the image model and setup the webcam
  async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
      // and class labels
      labelContainer.appendChild(document.createElement("div"));
    }
  }

  async function snap() {
    predict();
  }

  async function loop() {
    webcam.update(); // update the webcam frame
    window.requestAnimationFrame(loop);
  }

  // run the webcam image through the image model
  async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    console.log(
      prediction[0].className + ": " + prediction[0].probability.toFixed(2)
    );
    console.log(
      prediction[1].className + ": " + prediction[1].probability.toFixed(2)
    );
    console.log(
      prediction[2].className + ": " + prediction[2].probability.toFixed(2)
    );
    //labelContainer.childNodes[i].innerHTML = classPrediction;
  }

  // -----------------------------
  /*
  const RESULT_MAPPING = ["Positive", "Negative", "Invalid", "Not recognized"];
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState("");

  const processImagePrediction = async (base64Image) => {
    //const croppedData = await cropPicture(base64Image, 300);
    const model = await getModel();
    const tensor = await convertBase64ToTensor(base64Image);

    const prediction = await startPrediction(model, tensor);

    console.log(prediction);
    */
  /*const highestPrediction = prediction.indexOf(
      Math.max.apply(null, prediction)
    );
    */
  //setResult(RESULT_MAPPING[highestPrediction]);
  //console.log(prediction);
  //console.log(result);

  const webcamRef = useRef(null); //webcam reference
  const [imgSrc, setImgSrc] = useState(null); //init
  const [outputImg, setOutputImg] = useState(null); //init

  /*
  const [resultText, setResultText] = useState(null); //init
  const [resultAccuracy, setResultAccuracy] = useState(null); //init
  */
  /*
  const value_chart = {
    0: "Positive",
    1: "Negative",
    2: "Invalid",
    3: "Not recognized",
  };
  */

  //capture function
  const capture = useCallback(() => {
    const imageSource = webcamRef.current.getScreenshot();
    setImgSrc(imageSource);
    //setIsProcessing(true);
    //processImagePrediction(imageSource);
    //timeout
    /*
    setTimeout(() => {
      processImage(imageSource);
    }, 1000);
    */
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null); //reset image
  };

  /*
  const processImage = (imgSrc) => {
    const result = calculateResult(imgSrc);
    setResultText(value_chart[result[0]]);
    setResultAccuracy(result[1]);
  };
  */

  return (
    <div className="container">
      {imgSrc ? (
        <img
          id="img_src"
          src={imgSrc}
          alt="taken_image"
          width="300"
          height="900"
        />
      ) : (
        /*
        <Webcam height={900} width={900} ref={webcamRef} />
        */
        <>
          <div id="webcam-container"></div>
          <div id="label-container"></div>
        </>
      )}
      <div className="btn-container">
        {imgSrc ? (
          <button className="btn bg-white text-black" onClick={init}>
            Retake photo
          </button>
        ) : (
          <>
            <button className="btn bg-white text-black" onClick={init}>
              Open Webcam
            </button>
            <button className="btn bg-white text-black" onClick={snap}>
              Take Picture
            </button>
          </>
        )}
      </div>
      <h1 className="text-white">{}</h1>
      <h2 className="text-white">{}</h2>
      <img
        id="c_mask"
        src="src/assets/c_mask.png"
        alt="c mask"
        width="116"
        height="27"
        className="hidden"
      />
      <img
        id="t_mask"
        src="src/assets/t_mask.png"
        alt="t mask"
        width="114"
        height="37"
        className="hidden"
      />
      {/* 
      <img
        id="pos_sample"
        src="src/assets/mask_positive.png"
        alt="pos sample"
        width="250"
        height="300"
        className="hidden"
      />
      <img
        id="neg_sample"
        src="src/assets/mask_negative.png"
        alt="neg sample"
        width="250"
        height="300"
        className="hidden"
      />
      <img
        id="inv_sample"
        src="src/assets/mask_invalid.png"
        alt="inv sample"
        width="250"
        height="300"
        className="hidden"
      />
      <img
        id="null_sample"
        src="src/assets/mask_null.png"
        alt="inv sample"
        width="250"
        height="300"
        className="hidden"
      />*/}
      <img
        id="dummy_img"
        src="src/assets/negative_test.png"
        alt="dummy img"
        width="300"
        height="900"
        className="hidden"
      />
    </div>
  );
}

export default Camera;
