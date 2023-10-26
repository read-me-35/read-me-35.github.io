import { useEffect } from 'react';

const Synthesis = () => {
  useEffect(() => { //this code will run after the render
    let utterance = new SpeechSynthesisUtterance(document.body.innerText);
    window.speechSynthesis.speak(utterance);
  }, []);

  return null;
};

export default Synthesis;