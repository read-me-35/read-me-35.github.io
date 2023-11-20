import { useEffect } from "react";
import home from "../../assets/images/homeimage.png";
import covid from "../../assets/images/covidimage.png";
import pregnancy from "../../assets/images/pregnancyimage.webp";
import external from "../../assets/images/external-link.png";
import question from "../../assets/images/question-sign.png";
import tryAgain from "../../assets/images/tryagainimage.png";
import "./ResultPage.css";

function ResultPage(props) {
  const sentences = [
    "You Tested Covid Positive.\nThe test reads two solid lines ",
    "You Tested Covid Negative.\nThe test reads a solid control line and a blank test line",
    "Unable to Read Covid Test.\nPlease Try Again",
    "You are Pregnant.\nThe test reads two solid lines",
    "You are Not Pregnant.\nThe test reads a solid control line and a blank test line",
    "Unable to Read Pregnancy Test.\nPlease Try Again",
  ];

  const links = [
    "https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/testing.html",
    "https://www.pregnancyinfo.ca/",
  ];

  let img = null;
  let text = "";
  let activeLink = null;
  switch (props.testType) {
    case "covid":
      activeLink = links[0];
      switch (props.results[0][0]) {
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
          text = "Invalid, please try again";
          img = question;
          break;
      }
      break;
    case "pregnancy":
      activeLink = links[1];
      switch (props.results[0][0]) {
        case "0.Positive":
          text = sentences[3];
          img = pregnancy;
          break;
        case "1.Negative":
          text = sentences[4];
          img = pregnancy;
          break;
        case "2.Invalid":
          text = sentences[5];
          img = question;
          break;
        default:
          text = "Invalid, please try again";
          img = question;
          break;
      }
  }

  useEffect(() => {
    // Check the first element at index [0][0] of the results array
    let utterance = new SpeechSynthesisUtterance(document.body.innerText);
    window.speechSynthesis.speak(utterance);
  }, [props.results]);

  return (
    <div className="bg-gray-900 text-black h-screen flex flex-col justify-start items-center">
      <button
        className="bg-red-500 custom-button text-black w-80 py-4 rounded-lg flex space-x-2 mt-4 justify-center items-center"
        alt="return home button"
        onClick={() => {
          props.backToHomePage();
        }}
      >
        <img src={home} alt="Icon" className="w-20 h-20" />
        <span className="text-lg font-bold custom-button" alt="Home text">
          Home
        </span>
      </button>
      <div className="bg-gray-700 p-6 rounded-lg w-80 flex flex-col justify-center items-center mt-4 custom-height">
        <div className="flex flex-col items-center mt-4 custom-text">
          <p className="text-lg font-bold custom-text" alt="additional text">
            Result:
          </p>

          <img src={img} alt="Result Image" className="w-32 h-32 mt-6" />

          <div
            className="text-black text-center mt-8 custom-subTitle"
            alt="description"
          >
            <p style={{ textDecoration: "underline" }} alt="Test result">
              {props.results[0][0] && props.results[0][0].split(".")[1]}
            </p>
          </div>
        </div>
        <div
          className="text-black text-center mt-8 custom-text"
          alt="description"
        >
          <p alt="description text">{text}</p>
        </div>
        <div className="flex flex-row gap-2">
          <button
            className="bg-yellow-300 text-black px-8 py-4 rounded-lg flex flex-row items-center space-x-2 mt-4"
            alt="next button"
            onClick={() => {
              props.backToTestPage();
            }}
          >
            <span className="text-lg font-bold" alt="button text">
              Try again
            </span>
            <img src={tryAgain} alt="Icon" className="w-8 h-8" />
          </button>
          <button
            className="bg-blue-300 text-black px-8 py-4 rounded-lg flex items-center flex-row space-x-2 mt-4"
            alt="next button"
            onClick={() => {
              props.backToTestPage();
            }}
          >
            <a href={activeLink} target="_blank" rel="noreferrer">
              Info
            </a>
            <img src={external} alt="Icon" className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
