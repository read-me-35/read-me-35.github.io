import React, { useState } from 'react';

function ResultPage({ results },props) {
    const [messageIndex, setMessageIndex] = useState(0);
    const sentences = [
      "You Tested Covid Positive\nThe test reads two solid lines ",
      "You Tested Covid Negative\nThe test reads one solid line ",
      "You Tested Inconclusive",
      "Unable to Read Test\nPlease Try Again",
    ];

  const handleNextClick = () => {
    // Update the message index to display the next message
    setMessageIndex((prevIndex) => (prevIndex < sentences.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const [ButtonTextIndex, setButtonIndex] = useState(0);
  const ButtonText = [
    "Info",
    "Try Again",
  ];


  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col justify-center items-center">
      <div className="flex-1 flex flex-col justify-center items-center space-y-4">
        <button className="bg-yellow-300 text-white px-8 py-4 rounded-lg flex flex-col items-center space-y-2" onClick={pageIndex==1}>
          <span>Home</span>
          <img
            src="path-to-your-image.png" // Replace with the actual path to your image
            alt="Icon"
            className="w-6 h-6"
          />
        </button>
        <div className="text-gray-300 text-center">
          <p>{results}</p>
        </div>
        <div className="text-center">
          <p>{sentences[messageIndex]}</p>
        </div>
        <button className="bg-blue-300 text-white px-8 py-4 rounded-lg flex flex-col items-center space-y-2" onClick={handleNextClick}>
          <span>{ButtonText[ButtonTextIndex]}</span>
          <img
            src="/assets/images/covidimage.png"
            alt="Icon"
            className="w-6 h-6"
          />
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
