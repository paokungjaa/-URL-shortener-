import './App.css';
import BackgroundAnimate from './BackgroundAnimate';
import InputShortener from './InputShortener';
import LinkForm from './LinkForm';

function App() {
  return (
  <div className="container">
    <InputShortener />
    <BackgroundAnimate/>
    <LinkForm />
  </div>
  );
}

export default App;
