import React, { useState, useEffect } from "react";
import home from "../../assets/images/homeimage.png";
import covid from "../../assets/images/covidimage.png";
import external from "../../assets/images/external-link.png";
import question from "../../assets/images/question-sign.png";
import tryAgain from "../../assets/images/tryagainimage.png";
import "./ResultPage.css";

function ResultPage({ results, setPageIndex, pages }, props) {
  const [messageIndex, setMessageIndex] = useState(0);
  const sentences = [
    "You Tested Covid Positive\nThe test reads two solid lines ",
    "You Tested Covid Negative\nThe test reads one solid line ",
    "Unable to Read Test\nPlease Try Again",
  ];

  const result = [
    "Positive",
    "Negative",
    "Inconclusive",
  ];

  const [ButtonTextIndex, setButtonIndex] = useState(0);
  const ButtonText = [
    "Info",
    "Try Again",
  ];
  const handleNextClick = () => {
    console.log("Next button clicked");
    if (ButtonText[ButtonTextIndex] === "Try Again") {
      console.log("Navigating to the selection page");
      //setPageIndex(pages.findIndex((page) => page.key === "selection"));
      props.toNextPage();
    } else {
      console.log("Proceeding to the next message");
      setMessageIndex((prevIndex) =>
        prevIndex < sentences.length - 1 ? prevIndex + 1 : prevIndex
      );
    }
  };

  useEffect(() => {
    console.log("Results:", results);

    // Check the first element at index [0][0] of the results array
    const firstResult = results && results.length > 0 ? results[0][0] : "";

    // Update messageIndex based on the result
    if (firstResult.includes("Positive")) {
      setMessageIndex(0);
      setButtonIndex(0);//Info
    } else if (firstResult.includes("Negative")) {
      setMessageIndex(1);
      setButtonIndex(0);//Info
    } else {
      setMessageIndex(2);
      setButtonIndex(1); // Inconclusive
    }

    let utterance = new SpeechSynthesisUtterance(document.body.innerText);
    window.speechSynthesis.speak(utterance);
  }, [results]);
  const buttonImage = ButtonTextIndex === 1 ? tryAgain : external;

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
      <div className="flex flex-col items-center mt-4 custom-text">
        <p className="text-lg font-bold custom-text" alt="additional text">
          Result:
        </p>
        {results && results.length > 0 && results[0][0].includes("Invalid") ? (
          <img
            src={question}
            alt="Question mark image"
            className="w-32 h-32 mt-6"
          />
        ) : (
          <img
            src={covid}
            alt="Covid 19 image"
            className="w-32 h-32 mt-6"
          />
        )}
        <div className="text-black text-center mt-8 custom-subTitle" alt="description">
          <p style={{ textDecoration: "underline" }} alt="Test result">{result[messageIndex]}</p>
        </div>
      </div>
        <div className="text-black text-center mt-8 custom-text" alt="description">
          <p alt="description text">{sentences[messageIndex]}</p>
        </div>
        <button
          className="bg-blue-300 text-black px-8 py-4 rounded-lg flex items-center space-x-2 mt-4"
          alt="next button"
          onClick={() => props.toNextPage()}
        >
          <span className="text-lg font-bold" alt="button text">
            {ButtonText[ButtonTextIndex]}
          </span>
          <img
            src={buttonImage}
            alt="Icon"
            className="w-8 h-8"
          />
        </button>
      </div>
    </div>
  );  
}

export default ResultPage;
