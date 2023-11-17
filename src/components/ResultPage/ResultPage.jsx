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
    "You Tested Inconclusive",
    "Unable to Read Test\nPlease Try Again",
  ];

  const handleNextClick = () => {
    if (ButtonText[ButtonTextIndex] === "Try Again") {
      // Navigate to the selection page when the button text is "Try Again"
      setPageIndex(pages.findIndex((page) => page.key === "selection"));
    } else {
      // Proceed with the default behavior for other button texts
      setMessageIndex((prevIndex) =>
        prevIndex < sentences.length - 1 ? prevIndex + 1 : prevIndex
      );
    }
  };

  const [ButtonTextIndex, setButtonIndex] = useState(0);
  const ButtonText = [
    "Info",
    "Try Again",
  ];
  const buttonImage = results && results.length > 0 && results[0][0].includes("Invalid")
    ? tryAgain
    : external;

  useEffect(() => {
    console.log("Results:", results);

    // Check the first element at index [0][0] of the results array
    const firstResult = results && results.length > 0 ? results[0][0] : "";

    // Update messageIndex based on the result
    if (firstResult.includes("Positive")) {
      setMessageIndex(0);
    } else if (firstResult.includes("Negative")) {
      setMessageIndex(1);
    } else {
      setMessageIndex(2); // Inconclusive
    }

    // If the result is "Invalid", set the button text to "Try Again"
    if (firstResult.includes("Invalid")) {
      setButtonIndex(1); // Set ButtonTextIndex to 1 (index for "Try Again")
    }

    let utterance = new SpeechSynthesisUtterance(document.body.innerText);
    window.speechSynthesis.speak(utterance);
  }, [results]);

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
      <div className="text-black text-center" alt="description">
        {results && results.length > 0 && results[0][0].includes("Positive") && (
          <p alt="description text">
            <span style={{ textDecoration: "underline" }}>Covid Positive</span>
          </p>
        )}
        {results && results.length > 0 && results[0][0].includes("Negative") && (
          <p alt="description text">
            <span style={{ textDecoration: "underline" }}>Covid Negative</span>
          </p>
        )}
        {!results || (results.length === 0 && (
          <p alt="description text">{sentences[messageIndex]}</p>
        ))}
      </div>
      <div className="flex flex-col items-center mt-4">
        <p className="text-lg font-bold" alt="additional text">
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
      </div>
        <div className="text-black text-center mt-8" alt="description">
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
