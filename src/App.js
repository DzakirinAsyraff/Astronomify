import Home from './Pages/Home';
import Main from './Pages/Main';
import Final from './Pages/Final';
import {Routes, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/final/:date" element={<Final />} />
      </Routes>
    </div>
  );
}

export default App;
