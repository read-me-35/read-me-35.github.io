import covid from "../../assets/images/covidimage.png";
import ph from "../../assets/images/phimage.png";
import preg from "../../assets/images/pregnancyimage.webp";
import { useEffect } from "react";

function Selection(props) {
  useEffect(() => { //this code will run after the render
    let utterance = new SpeechSynthesisUtterance(document.body.innerText);
    window.speechSynthesis.speak(utterance);
  }, []);
  return (
    <div className="bg-transparent text-white h-screen flex flex-col justify-center items-center">
      <div className="flex-1 flex flex-col justify-center items-center space-y-4 wrap">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg w-36 sm:w-40 flex flex-col items-center space-y-2"
          onClick={props.toPrevPage}
        >
          <span className="text-center text-base sm:text-lg">Back</span>
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg w-36 sm:w-40 flex flex-col items-center space-y-2"
          onClick={props.toNextPage}
        >
          <span className="text-center text-base sm:text-lg">Covid</span>
          <img src={covid} alt="Icon" className="w-6 h-6" />
        </button>
        <button className="bg-pink-500 text-white px-4 py-2 rounded-lg w-36 sm:w-40 flex flex-col items-center space-y-2">
          <span className="text-center text-base sm:text-lg">Pregnancy</span>
          <img src={preg} alt="Icon" className="w-6 h-6" />
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-36 sm:w-40 flex flex-col items-center space-y-2">
          <span className="text-center text-base sm:text-lg">PH Level</span>
          <img src={ph} alt="Icon" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default Selection;
