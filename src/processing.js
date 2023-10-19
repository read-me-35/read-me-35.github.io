/* eslint-disable no-unused-vars */
//import samplePos from "./assets/sample_pos.png";
//import sampleNeg from "./assets/sample_neg.png";
//import sampleInv from "./assets/sample_inv.png";
import cv from "@techstark/opencv-js";

export const calculateResult = () => {
  /*
  const maskPos = cv.imread(document.getElementById("pos_sample"));
  cv.threshold(maskPos, maskPos, 0, 255, cv.THRESH_TOZERO);
  const maskNeg = cv.imread(document.getElementById("neg_sample"));
  cv.threshold(maskNeg, maskNeg, 0, 255, cv.THRESH_TOZERO);
  const maskInv = cv.imread(document.getElementById("inv_sample"));
  cv.threshold(maskInv, maskInv, 0, 255, cv.THRESH_TOZERO);
  const maskNull = cv.imread(document.getElementById("null_sample"));
  cv.threshold(maskNull, maskNull, 0, 255, cv.THRESH_TOZERO);
  */
  const cMask = cv.imread(document.getElementById("c_mask"));
  cv.threshold(cMask, cMask, 0, 255, cv.THRESH_TOZERO);

  const tMask = cv.imread(document.getElementById("t_mask"));
  cv.threshold(tMask, tMask, 0, 255, cv.THRESH_TOZERO);

  const src = cv.imread(document.getElementById("img_src"));
  cv.threshold(src, src, 0, 255, cv.THRESH_TOZERO);

  const cMaskResult = checkAccuracy(src, cMask);
  const tMaskResult = checkAccuracy(src, tMask);

  const cMaskAccuracy = cMaskResult.maxVal;
  const tMaskAccuracy = tMaskResult.maxVal;

  console.log(cMaskAccuracy);
  console.log(tMaskAccuracy);
  /*
  const pos_accuracy = checkAccuracy(src, maskPos);
  const neg_accuracy = checkAccuracy(src, maskNeg);
  const inv_accuracy = checkAccuracy(src, maskInv);
  const null_accuracy = checkAccuracy(src, maskNull);
  

  const result = {
    0: pos_accuracy.maxVal,
    1: neg_accuracy.maxVal,
    2: inv_accuracy.maxVal,
    3: null_accuracy.maxVal,
  };
  for (let key in result) {
    console.log(result[key]);
    //result[key] = (result[key] * 100).toFixed(2);
  }
  maskPos.delete();
  maskNeg.delete();
  maskInv.delete();
  maskNull.delete();
  
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
    maxKey = 4;
  }
  return [maxKey, max[0] + max[1] + "." + max[2] + max[3] + "%"];
  */
};

const checkAccuracy = (src, templ) => {
  const dst = new cv.Mat();
  const mask = new cv.Mat();
  cv.matchTemplate(src, templ, dst, cv.TM_CCOEFF_NORMED, mask);
  const precision = cv.minMaxLoc(dst, mask);
  dst.delete();
  mask.delete();
  return precision;
};
