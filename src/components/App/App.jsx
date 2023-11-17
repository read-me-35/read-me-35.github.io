import { useState, useEffect } from "react";
import "./App.css";
import Home from "../Home/Home.jsx";
import Selection from "../Selection/Selection.jsx";
import Settings from "../Settings/Settings.jsx";
import ReadyPage from "../ReadyPage/ReadyPage.jsx";
import Camera from "../Camera/Camera.jsx";
import ResultPage from "../ResultPage/ResultPage.jsx";

function App() {
  const [pageIndex, setPageIndex] = useState(1);
  const [isLightMode, setLightMode] = useState(false);
  const [currentTestType, setCurrentTestType] = useState(""); // ["covid", "pregnancy", "ph"
  const [results, setResults] = useState(null); // Initialize results state

  const toggleMode = () => {
    setLightMode(!isLightMode);
  };

  const nextPage = () => {
    if (pageIndex !== pages.length - 1)
      setPageIndex((pageIndex) => pageIndex + 1);

      // If the next page is ResultPage, pass the results state
    if (pageIndex === pages.length - 2) {
      pages[pageIndex + 1] = React.cloneElement(pages[pageIndex + 1], { results });
    }
  };

  const previousPage = () => {
    if (pageIndex !== 0) setPageIndex((pageIndex) => pageIndex - 1);
  };

  const onClickCovid = () => {
    setCurrentTestType("covid");
  };

  const onClickPregnancy = () => {
    setCurrentTestType("pregnancy");
  };

  const onClickPH = () => {
    setCurrentTestType("ph");
  };

  const pages = [
    <Settings
      key="settings"
      toPrevPage={previousPage}
      toNextPage={nextPage}
      toggleDisplayMode={toggleMode}
      isLightMode={isLightMode}
    />,
    <Home key="home" toPrevPage={previousPage} toNextPage={nextPage} />,
    <Selection
      key="selection"
      toPrevPage={previousPage}
      toNextPage={nextPage}
      onClickCovid={onClickCovid}
      onClickPregnancy={onClickPregnancy}
      onClickPH={onClickPH}
      isLightMode={isLightMode}
    />,
    <ReadyPage
      key="readyPage"
      toPrevPage={previousPage}
      toNextPage={nextPage}
      testType={currentTestType}
    />,
    <Camera
      key="camera"
      toPrevPage={previousPage}
      toNextPage={nextPage}
      testType={currentTestType}
      isLightMode={isLightMode}
      setResults={setResults} // Pass the setResults function as a prop
    />,
    <ResultPage
      key="resultPage"
      toPrevPage={previousPage}
      toNextPage={nextPage}
      testType={currentTestType}
      isLightMode={isLightMode}
      results={results} // Pass the results state as a prop
      setPageIndex={setPageIndex} // Pass the setPageIndex function as a prop
    />,
  ];

  useEffect(() => { //this code will run after the render
    let utterance = new SpeechSynthesisUtterance(document.body.innerText);
    window.speechSynthesis.speak(utterance);
  }, []);

  return (
    <div className={`${isLightMode ? "bg-white" : "bg-gray-900"}`}>
      {pages[pageIndex]}
    </div>
  );
}

export default App;
