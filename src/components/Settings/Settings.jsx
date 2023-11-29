import dark from "../../assets/images/moonimage.png";
import light from "../../assets/images/lightimage.png";
import soundOn from "../../assets/images/soundOn.png";
import soundOff from "../../assets/images/soundOff.png";
import { useEffect, useState } from 'react';

function Selection(props) {
  
  useEffect(() => { //this code will run after the render, for tts
    if (props.isTtsEnabled) {
      let utterance = new SpeechSynthesisUtterance(document.body.innerText);
      window.speechSynthesis.speak(utterance);
    }
  }, []);
  return (
    <div
      className={` text-white h-screen flex flex-col justify-center items-center bg-transparent`}
    >
      <div className="flex-1 flex flex-col justify-center items-center space-y-4" alt="container">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg w-32 flex flex-col items-center space-y-2"
          alt="next page button"
          onClick={props.toNextPage}
        >
          <span className="text-center" alt="back text">Back</span>
        </button>
        <div className="my-2" alt="space"></div> {/* Add space between buttons */}
        <button
          className={`${
            props.isLightMode ? "bg-gray-700 text-white" : "bg-white text-black"
          }  px-4 py-2 rounded-lg w-48 flex flex-col items-center space-y-2`}
          alt="toggle dark mode button"
          onClick={props.toggleDisplayMode}
        >
          <span className="text-center" alt="button text">{props.isLightMode ? "Light" : "Dark"}</span>
          {props.isLightMode ? (
            <img src={light} alt="Icon" className="w-8 h-8" />
          ) : (
            <img src={dark} alt="Icon" className="w-8 h-8" />
          )}
        </button>
        <button
          className={`${
            props.isLightMode ? "bg-gray-700 text-white" : "bg-white text-black"
          }  px-4 py-2 rounded-lg w-48 flex flex-col items-center space-y-2`}
          alt="toggle dark mode button"
          onClick={props.toggleTtsMode}
        >
          <span className="text-center" alt="button text">Text-To-Speech Sound</span>
          <img 
            src={props.isTtsEnabled ? soundOn : soundOff}
            alt="Icon"
            className="w-8 h-8"
          />
        </button>
      </div>
    </div>
  );
}

export default Selection;
