import React, { useState, useEffect } from "react";
import home from "../../assets/images/homeimage.png";
import covid from "../../assets/images/covidimage.png";
import external from "../../assets/images/external-link.png";
import "./ResultPage.css";

function ResultPage({ results }, props) {
  const [messageIndex, setMessageIndex] = useState(0);
  const sentences = [
    "You Tested Covid Positive\nThe test reads two solid lines ",
    "You Tested Covid Negative\nThe test reads one solid line ",
    "You Tested Inconclusive",
    "Unable to Read Test\nPlease Try Again",
  ];

  const handleNextClick = () => {
    // Update the message index to display the next message
    setMessageIndex((prevIndex) =>
      prevIndex < sentences.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const [ButtonTextIndex, setButtonIndex] = useState(0);
  const ButtonText = [
    "Info",
    "Try Again",
  ];

  useEffect(() => { //this code will run after the render, for tts
    let utterance = new SpeechSynthesisUtterance(document.body.innerText);
    window.speechSynthesis.speak(utterance);
  }, []);

  return (
    <div className="bg-gray-900 text-black h-screen flex flex-col justify-start items-center">
      <button
        className="bg-yellow-300 custom-button text-black w-80 py-4 rounded-lg flex items-center space-x-2 mt-4 justify-center items-center"
        alt="return home button"
        onClick={() => {
          setPageIndex(pages.findIndex((page) => page.key === "home"));
        }}
      >
        <img
          src={home}
          alt="Icon"
          className="w-20 h-20"
        />
        <span className="text-lg font-bold custom-button" alt="Home text">
          Home
        </span>
      </button>
      <div className="bg-gray-700 p-6 rounded-lg w-80 flex flex-col justify-center items-center mt-4 custom-height">
        <div className="text-black text-center" alt="results">
          <p alt="results text">{results}</p>
        </div>
        {/* Additional content */}
        <div className="flex flex-col items-center mt-4">
          <p className="text-lg font-bold" alt="additional text">
            Additional Text
          </p>
          <img
            src={covid}
            alt="Covid 19 image"
            className="w-48 h-48 mt-2"
          />
        </div>
        {/* End of additional content */}
        <div className="text-black text-center" alt="description">
          <p alt="description text">{sentences[messageIndex]}</p>
        </div>
        <button
          className="bg-blue-300 text-black px-8 py-4 rounded-lg flex items-center space-x-2 mt-4"
          alt="next button"
          onClick={handleNextClick}
        >
          <span className="text-lg font-bold" alt="button text">
            {ButtonText[ButtonTextIndex]}
          </span>
          <img
            src={external}
            alt="Icon"
            className="w-6 h-6"
          />
        </button>
      </div>
    </div>
  );  
}

export default ResultPage;
