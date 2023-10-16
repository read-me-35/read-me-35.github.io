import { useState } from "react";
import "./App.css";
import Home from "../Home/Home.jsx";
import Selection from "../Selection/Selection.jsx";
import Settings from "../Settings/Settings.jsx";
import ReadyPage from "../ReadyPage/ReadyPage.jsx";
import Camera from "../Camera/Camera.jsx";
import ResultPage from "../ResultPage/ResultPage.jsx";

function App() {
  const [pageIndex, setPageIndex] = useState(0);
  const pages = [
    <Home key="home" />,
    <Selection key="selection" />,
    <Settings key="settings" />,
    <ReadyPage key="readyPage" />,
    <Camera key="camera" />,
    <ResultPage key="resultPage" />,
  ];

  const nextPage = () => {
    if (pageIndex != pages.length - 1)
      setPageIndex((pageIndex) => pageIndex + 1);
  };

  const previousPage = () => {
    if (pageIndex != 0) setPageIndex((pageIndex) => pageIndex - 1);
  };

  return (
    <>
      <div className="h-full w-full flex">
        <div className="border border-red h-48 w-48">
          <button
            className="border border-black text-black"
            onClick={previousPage}
          >
            Previous Page
          </button>
          <button className="border border-black text-black" onClick={nextPage}>
            Next Page
          </button>
        </div>
        <div className="content">{pages[pageIndex]}</div>
      </div>
    </>
  );
}

export default App;
