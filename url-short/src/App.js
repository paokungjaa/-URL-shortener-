import { useState } from 'react';
import './App.css';
import BackgroundAnimate from './BackgroundAnimate';
import InputShortener from './InputShortener';
import LinkForm from './LinkForm';

function App() {
  const[inputValue, setinputValue] = useState("");
    

  return (
  <div className="container">
    <InputShortener setinputValue={setinputValue} />
    <BackgroundAnimate/>
    <LinkForm inputValue={inputValue} />
   
  </div>
  );
}

export default App;
