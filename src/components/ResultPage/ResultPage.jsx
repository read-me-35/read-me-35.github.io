import { useEffect } from "react";
import home from "../../assets/images/homeimage.png";
import covid from "../../assets/images/covidimage.png";
import pregnancy from "../../assets/images/pregnancyimage.webp";
import external from "../../assets/images/external-link.png";
import question from "../../assets/images/question-sign.png";
import tryAgain from "../../assets/images/tryagainimage.png";
import { getResults, getCurrentTestType } from "../resultManager.js";

function ResultPage(props) {
  const sentences = [
    "You Tested Covid Positive.\nThe test reads two solid lines.",
    "You Tested Covid Negative.\nThe test reads a solid control line and a blank test line.",
    "Unable to Read Covid Test.\nPlease Try Again.",
    "You are Pregnant.\nThe test reads two solid lines.",
    "You are Not Pregnant.\nThe test reads a solid control line and a blank test line.",
    "Unable to Read Pregnancy Test.\nPlease Try Again.",
  ];

  const links = [
    "https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/testing.html",
    "https://www.pregnancyinfo.ca/",
  ];

  const results = getResults();
  const testType = getCurrentTestType();

  let img = null;
  let text = "";
  let activeLink = null;

  switch (testType) {
    case "covid":
      if (results[0][1] < 95) {
        results[0][0] = "2.Invalid";
        results[0][1] = "?";
      }
      activeLink = links[0];
      switch (results[0][0]) {
        case "0.Positive":
          text = sentences[0];
          img = covid;
          break;
        case "1.Negative":
          text = sentences[1];
          img = covid;
          break;
        case "2.Invalid":
          text = sentences[2];
          img = question;
          break;
        case "3.Null":
          text = sentences[2];
          img = question;
          break;
        default:
          text = "";
          img = question;
          break;
      }
      break;
    case "pregnancy":
      if (results[0][1] < 95) {
        results[0][0] = "3.Invalid";
        results[0][1] = "?";
      }
      activeLink = links[1];
      switch (results[0][0]) {
        case "1.Pregnant":
          text = sentences[3];
          img = pregnancy;
          break;
        case "2.Not Pregnant":
          text = sentences[4];
          img = pregnancy;
          break;
        case "3.Invalid":
          text = sentences[5];
          img = question;
          break;
        default:
          text = "";
          img = question;
          break;
      }
      break;
    default:
      text = "Testing Complete";
      img = question;
      break;
  }

  useEffect(() => {
    // Check the first element at index [0][0] of the results array
    if (props.isTtsEnabled) {
      let utterance = new SpeechSynthesisUtterance(document.body.innerText);
      window.speechSynthesis.speak(utterance);
    }
  }, [results]);

  return (
    <div className="text-black h-screen flex flex-col justify-start items-center">
      <div
        className="flex-1 flex flex-col justify-center items-center space-y-4"
        alt="container"
      >
        <button
          className="bg-red-500 text-black h-14 px-4 py-2 rounded-lg flex items-center flex-row space-x-2 gap-2"
          alt="return home button"
          onClick={() => {
            props.backToHomePage();
          }}
        >
          <img src={home} alt="Icon" className="w-10 h-10" />
          <span className="text-lg text-black font-bold" alt="Home text">
            Home
          </span>
        </button>
        <div className="bg-gray-700 w-52 p-4 rounded-lg flex flex-col justify-center items-center gap-4">
          <p className="text-lg font-bold text-gray-300" alt="additional text">
            Result:
          </p>

          <img src={img} alt="Result Image" className="w-16 h-16" />

          <div className="text-black text-center" alt="description">
            <p className="underline text-gray-300 text-2xl" alt="Test result">
              {results[0][0].split(".")[1]}
            </p>
            <p className=" text-gray-300 text-lg" alt="Test result">
              {`Accuracy : ${results[0][1]}%`}
            </p>
          </div>

          <div className="text-gray-300 text-center text-sm flex flex-col gap-2">
            <div className="border-2 border-gray-600 rounded-lg p-2">
              <p alt="description">{text}</p>
            </div>
            <p className="font-bold text-xs" alt="description">
              Warning: This result may not be entirely reliable, as it was
              calculated by a computer.
            </p>
            <div className="border-2 border-gray-600 bg-gray-600 rounded-lg p-2">
              <p className="italic" alt="description">
                Visit the link below for more information. This is an external
                site.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <button
            className="bg-yellow-300 text-black h-14 px-4 py-2 rounded-lg flex flex-row items-center space-x-2 gap-2"
            alt="next button"
            onClick={() => {
              props.backToTestPage();
            }}
          >
            <img src={tryAgain} alt="Icon" className="w-10 h-10" />
            <span className="text-lg font-bold" alt="button text">
              Try again
            </span>
          </button>
          <button
            className="bg-blue-300 text-black h-14 px-4 py-2 rounded-lg flex items-center flex-row space-x-2 gap-2"
            alt="next button"
          >
            <img src={external} alt="Icon" className="w-8 h-8" />
            <a href={activeLink} target="_blank" rel="noreferrer">
              <span className="text-lg font-bold" alt="button text">
                More info
              </span>
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
