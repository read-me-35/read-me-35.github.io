import covid from "../../assets/images/covidimage.png";
import ph from "../../assets/images/phimage.png";
import preg from "../../assets/images/pregnancyimage.webp";
import { useEffect } from "react";
import { setCurrentTestType } from "../resultManager.js";

function Selection(props) {
  useEffect(() => {
    //this code will run after the render, for tts
    if (props.isTtsEnabled) {
      let utterance = new SpeechSynthesisUtterance(document.body.innerText);
      window.speechSynthesis.speak(utterance);
    }
  }, []);
  return (
    <div
      className="bg-transparent text-white h-screen flex flex-col justify-center items-center"
      alt="container"
    >
      <div
        className="flex-1 flex flex-col justify-center items-center space-y-4 wrap"
        alt="container"
      >
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg w-40 flex flex-col items-center space-y-2"
          alt="Return button"
          onClick={props.toPrevPage}
        >
          <span className="text-center text-lg" alt="Return">
            Back
          </span>
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg w-40 flex flex-col items-center space-y-2"
          onClick={() => {
            setCurrentTestType("covid"), props.toNextPage();
          }}
        >
          <span className="text-center text-lg">Covid</span>
          <img src={covid} alt="Select Covid Testing" className="w-6 h-6" />
        </button>
        <button
          className="bg-pink-500 text-white px-4 py-2 rounded-lg w-40 flex flex-col items-center space-y-2"
          onClick={() => {
            setCurrentTestType("pregnancy"), props.toNextPage();
          }}
        >
          <span className="text-center text-lg">Pregnancy</span>
          <img src={preg} alt="Select Pregnancy Testing" className="w-6 h-6" />
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-40 flex flex-col items-center space-y-2 cursor-not-allowed opacity-50"
          /*onClick={() => {
            setCurrentTestType("pH"), props.toNextPage();
          }}*/
        >
          <span className="text-center text-lg">PH Level</span>
          <img src={ph} alt="Select PH Level Testing" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default Selection;
