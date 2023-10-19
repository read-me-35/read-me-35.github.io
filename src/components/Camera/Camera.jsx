/* eslint-disable no-unused-vars */
import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";
import { calculateResult } from "../../processing.js";
import sample_pos from "../../assets/sample_pos.png";
import sample_neg from "../../assets/sample_neg.png";
import sample_inv from "../../assets/sample_inv.png";

function Camera() {
  const webcamRef = useRef(null); //webcam reference
  const [imgSrc, setImgSrc] = useState(null); //init
  const [outputImg, setOutputImg] = useState(null); //init

  const [resultText, setResultText] = useState(null); //init
  const [resultAccuracy, setResultAccuracy] = useState(null); //init

  const value_chart = {
    0: "Positive",
    1: "Negative",
    2: "Invalid",
    3: "Not recognized",
  };

  //capture function
  const capture = useCallback(() => {
    const imageSource = webcamRef.current.getScreenshot();
    setImgSrc(imageSource);
    //timeout
    setTimeout(() => {
      processImage(imageSource);
    }, 1000);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null); //reset image
  };

  const processImage = (imgSrc) => {
    const result = calculateResult(imgSrc);
    setResultText(value_chart[result[0]]);
    setResultAccuracy(result[1]);
  };

  return (
    <div className="container">
      {imgSrc ? (
        <img
          id="img_src"
          src={imgSrc}
          alt="taken_image"
          width="600"
          height="600"
        />
      ) : (
        <Webcam height={600} width={600} ref={webcamRef} />
      )}
      <div className="btn-container">
        {imgSrc ? (
          <button onClick={retake}>Retake photo</button>
        ) : (
          <button onClick={capture}>Capture photo</button>
        )}
      </div>
      <h1>{resultText}</h1>
      <h2>{resultAccuracy}</h2>
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
        id="inv_sample"
        src="src/assets/mask_null.png"
        alt="inv sample"
        width="250"
        height="300"
        className="hidden"
      />
      <img
        id="dummy_img"
        src="src/assets/positive_test.png"
        alt="dummy img"
        width="300"
        height="900"
        className="hidden"
      />
    </div>
  );
}

export default Camera;
