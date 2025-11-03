import { useState } from 'react';
import './App.css';
import BackgroundAnimate from './BackgroundAnimate';
import InputShortener from './InputShortener';
import LinkForm from './LinkForm';
import QRCodeDisplay from './QRcode'

function App() {
  const[inputValue, setinputValue] = useState("");
    const [shortenLink, setShortenLink] = useState(''); 

  return (
  <div className="container">
    <InputShortener setinputValue={setinputValue} />
    <BackgroundAnimate/>
    <LinkForm inputValue={inputValue} setShortenLink={setShortenLink} />
    <QRCodeDisplay value={shortenLink} />
  </div>
  );
}

export default App;
