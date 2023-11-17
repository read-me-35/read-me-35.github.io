import { useEffect } from 'react';


function Synthesis(msg = document.body.innerText) {

  useEffect(() => { //this code will run after the render
    let utterance = new SpeechSynthesisUtterance(msg);
    window.speechSynthesis.speak(utterance);
  }, []);

  return null;
};

export default Synthesis;