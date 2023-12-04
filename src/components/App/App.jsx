import { useState, useEffect } from "react";
import "./App.css";
import Home from "../Home/Home.jsx";
import Selection from "../Selection/Selection.jsx";
import Settings from "../Settings/Settings.jsx";
import ReadyPage from "../ReadyPage/ReadyPage.jsx";
import Camera from "../Camera/Camera.jsx";
import ResultPage from "../ResultPage/ResultPage.jsx";
import { projectPoints } from "@techstark/opencv-js";

function App() {
  const [pageIndex, setPageIndex] = useState(1);
  const [isLightMode, setLightMode] = useState(false);
  const [isTtsEnabled, setTts] = useState(false);
  //const [results, setResults] = useState(null); // Initialize results state

  const toggleMode = () => {
    setLightMode(!isLightMode);
  };
  
  const toggleTts = () => {
    setTts(!isTtsEnabled);
  }

  const nextPage = () => {
    if (pageIndex !== pages.length - 1)
      setPageIndex((pageIndex) => pageIndex + 1);

    // If the next page is ResultPage, pass the results state
    if (pageIndex === pages.length - 1) {
      setPageIndex((pageIndex) => pageIndex - 1);
    }
  };

  const previousPage = () => {
    if (pageIndex !== 0) setPageIndex((pageIndex) => pageIndex - 1);
  };

  const backToTestPage = () => {
    setPageIndex(4);
  };

  const backToHomePage = () => {
    setPageIndex(1);
  };

  const pages = [
    <Settings
      key="settings"
      toPrevPage={previousPage}
      toNextPage={nextPage}
      toggleDisplayMode={toggleMode}
      toggleTtsMode={toggleTts}
      isTtsEnabled={isTtsEnabled}
      isLightMode={isLightMode}
    />,
    <Home key="home" toPrevPage={previousPage} toNextPage={nextPage} isTtsEnable={isTtsEnabled} />,
    <Selection
      key="selection"
      toPrevPage={previousPage}
      toNextPage={nextPage}
      isTtsEnabled={isTtsEnabled}
      isLightMode={isLightMode}
    />,
    <ReadyPage
      key="readyPage"
      toPrevPage={previousPage}
      toNextPage={nextPage}
      isTtsEnabled={isTtsEnabled}
    />,
    <Camera
      key="camera"
      toPrevPage={previousPage}
      toNextPage={nextPage}
      isTtsEnabled={isTtsEnabled}
      isLightMode={isLightMode}
    />,
    <ResultPage
      key="resultPage"
      toPrevPage={previousPage}
      toNextPage={nextPage}
      isTtsEnabled={isTtsEnabled}
      isLightMode={isLightMode}
      backToTestPage={backToTestPage}
      backToHomePage={backToHomePage}
    />,
  ];

  useEffect(() => {
    //this code will run after the render
    if (isTtsEnabled) {
      let utterance = new SpeechSynthesisUtterance(document.body.innerText);
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  return (
    <div className={`${isLightMode ? "bg-white" : "bg-gray-900"}`}>
      {pages[pageIndex]}
    </div>
  );
}

export default App;
