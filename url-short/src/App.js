import './App.css';
import BackgroundAnimate from './BackgroundAnimate';
import InputShortener from './InputShortener';
import LinkFrom from './LinkForm';

function App() {
  return (
  <div className="container">
    <InputShortener />
    <BackgroundAnimate/>
    <LinkFrom/>
  </div>
  );
}

export default App;
