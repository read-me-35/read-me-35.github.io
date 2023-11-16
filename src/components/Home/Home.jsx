import setting from "../../assets/images/settingsimage.png";
import scan from "../../assets/images/scanimage.png";
import {useEffect} from 'react';
function Home(props) {
  useEffect(() => { //this code will run after the render
    let utterance = new SpeechSynthesisUtterance(document.body.innerText);
    window.speechSynthesis.speak(utterance);
  }, []);
  return (
    <div className="bg-transparent text-white min-h-screen flex flex-col justify-center items-center">
      <div className="flex-1 flex flex-col justify-center items-center">
        <button
          className="bg-green-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg w-full md:w-48 mb-4 flex flex-col items-center space-y-2"
          onClick={props.toNextPage}
        >
          <span className="text-center">Scan</span>
          <img src={scan} alt="Icon" className="w-8 h-8" />
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg w-full md:w-48 flex flex-col items-center space-y-2"
          onClick={props.toPrevPage}
        >
          <span className="text-center">Settings</span>
          <img src={setting} alt="Icon" className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}

export default Home;
