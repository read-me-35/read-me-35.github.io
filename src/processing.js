/* eslint-disable no-unused-vars */
//import samplePos from "./assets/sample_pos.png";
//import sampleNeg from "./assets/sample_neg.png";
//import sampleInv from "./assets/sample_inv.png";
import cv from "@techstark/opencv-js";

export const calculateResult = () => {
  const samplePos = cv.imread(document.getElementById("pos_sample"));
  const sampleNeg = cv.imread(document.getElementById("neg_sample"));
  const sampleInv = cv.imread(document.getElementById("inv_sample"));
  const src = cv.imread(document.getElementById("dummy_img"));

  const pos_accuracy = checkAccuracy(src, samplePos);
  const neg_accuracy = checkAccuracy(src, sampleNeg);
  const inv_accuracy = checkAccuracy(src, sampleInv);
  const result = {
    0: pos_accuracy.maxVal,
    1: neg_accuracy.maxVal,
    2: inv_accuracy.maxVal,
  };
  for (let key in result) {
    result[key] = (result[key] * 100).toFixed(2);
  }
  src.delete();

  //check which is max
  let max = 0;
  let maxKey = "";

  for (let key in result) {
    if (result[key] > max) {
      max = result[key];
      maxKey = key;
    }
  }

  //if maxkey is under 50% then return 3
  if (max < 40) {
    maxKey = 3;
  }
  return [maxKey, max[0] + max[1] + "." + max[2] + max[3] + "%"];
};

const checkAccuracy = (src, templ) => {
  const dst = new cv.Mat();
  const mask = new cv.Mat();
  cv.matchTemplate(src, templ, dst, cv.TM_CCOEFF, mask);
  const precision = cv.minMaxLoc(dst, mask);
  dst.delete();
  mask.delete();
  return precision;
};
