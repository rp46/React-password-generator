import './App.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PassGen from './PassGen';
toast.configure()

function App() {
  return (
    <div className="outer">
      <div className="middle">
        <div className="inner">
          <div className="marginForMobile">
          <h2>
            Password generator!
          </h2>
          <br />
          <PassGen />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
