import covid from "../../assets/images/covidimage.png";
import pregnancy from "../../assets/images/pregnancyimage.webp";
import ph from "../../assets/images/phimage.png";
import defaultImage from "../../assets/images/scanimage.png";
import { useEffect } from "react";
import { getCurrentTestType } from "../resultManager.js";

function ReadyPage(props) {
  const testType = getCurrentTestType();
  let img = null;
  let titleText = "";
  switch (testType) {
    case "covid":
      img = covid;
      titleText = "Covid Test";
      break;
    case "pregnancy":
      img = pregnancy;
      titleText = "Pregnancy Test";
      break;
    case "ph":
      img = ph;
      titleText = "pH Level Test";
      break;
    default:
      img = defaultImage;
      titleText = "Test";
  }
  useEffect(() => {
    //this code will run after the render, for tts
    if (props.isTtsEnabled) {
      let utterance = new SpeechSynthesisUtterance(document.body.innerText);
      window.speechSynthesis.speak(utterance);
    }
  }, []);
  return (
    <div
      className=" text-white h-screen flex flex-col justify-center items-center"
      alt="container"
    >
      <div
        className="flex-1 flex flex-col justify-center items-center space-y-4"
        alt="container"
      >
        <button
          className="bg-red-500 text-white px-6 py-3 rounded-lg w-36 flex flex-col items-center space-y-2"
          alt="back button"
          onClick={props.toPrevPage}
        >
          <span className="text-center" alt="back text">
            Back
          </span>
        </button>
        <div
          className="bg-gray-700 w-48 p-4 rounded-lg flex flex-col justify-center items-center"
          alt="prep container"
        >
          <h2
            className="text-xl font-bold text-center text-gray-300"
            alt="title text"
          >
            {titleText}
          </h2>
          <img
            src={img} // Replace with the actual path to your image
            alt="Image"
            className="w-28 h-28 my-4" // Adjust the width and height
          />
          <p className="text-gray-300 text-center mt-2" alt="prep text">
            {`Prepare your camera and click "Next" when ready to scan`}.
          </p>
        </div>
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-lg w-36 flex flex-col items-center space-y-2"
          alt="next button"
          onClick={props.toNextPage}
        >
          <span className="text-center" alt="next text">
            Next
          </span>
        </button>
      </div>
    </div>
  );
}

export default ReadyPage;
