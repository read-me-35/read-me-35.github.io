import { useState } from "react";
import "./App.css";
import Home from "../Home/Home.jsx";
import Selection from "../Selection/Selection.jsx";
import Settings from "../Settings/Settings.jsx";
import ReadyPage from "../ReadyPage/ReadyPage.jsx";
import Camera from "../Camera/Camera.jsx";
import ResultPage from "../ResultPage/ResultPage.jsx";
import { useEffect } from 'react';

function App() {
  const [pageIndex, setPageIndex] = useState(1);
  const [isLightMode, setLightMode] = useState(false);

  const toggleMode = () => {
      setLightMode(!isLightMode);
  };
  
  const nextPage = () => {
    if (pageIndex !== pages.length - 1) setPageIndex((pageIndex) => pageIndex + 1);
  };

  const previousPage = () => {
    if (pageIndex !== 0) setPageIndex((pageIndex) => pageIndex - 1);
  };

  const pages = [
    <Settings
      key="settings"
      toPrevPage={previousPage}
      toNextPage={nextPage}
      toggleDisplayMode={toggleMode}
      isLightMode={isLightMode} // Pass isLightMode as a prop to Settings
    />,
    <Home key="home" toPrevPage={previousPage} toNextPage={nextPage} />,
    <Selection
      key="selection"
      toPrevPage={previousPage}
      toNextPage={nextPage}
      isLightMode={isLightMode} // Pass isLightMode as a prop to Selection
    />,
    <ReadyPage key="readyPage" toPrevPage={previousPage} toNextPage={nextPage} />,
    <Camera key="camera" toPrevPage={previousPage} toNextPage={nextPage} />,
    <ResultPage key="resultPage" toPrevPage={previousPage} toNextPage={nextPage} />,
  ];

  useEffect(() => { //this code will run after the render
    let utterance = new SpeechSynthesisUtterance(document.body.innerText);
    window.speechSynthesis.speak(utterance);
  }, []);
 
  return (
    <div className={`${isLightMode ? 'bg-white' : 'bg-gray-900'}`}>
      {pages[pageIndex]}
      </div>  
  );``
}

export default App;
