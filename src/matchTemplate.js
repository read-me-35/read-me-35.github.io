// Match Template Algorithm from OpenCV (not used)

import cv from "@techstark/opencv-js";

export const calculateResult = () => {
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

  return { cMaskAccuracy, tMaskAccuracy };
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
