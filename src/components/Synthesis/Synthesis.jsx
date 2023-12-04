import { useEffect } from 'react';


function Synthesis(msg = document.body.innerText) {

  useEffect(() => { //this code will run after the render
    if (props.isTtsEnabled) {
      let utterance = new SpeechSynthesisUtterance(document.body.innerText);
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  return null;
};

export default Synthesis;