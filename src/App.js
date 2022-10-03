import Home from './Pages/Home';
import Main from './Pages/Main';
import Final from './Pages/Final';
import {Routes, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="Astronomify/" element={<Home />} />
        <Route path="Astronomify/main" element={<Main />} />
        <Route path="Astronomify/final/:date" element={<Final />} />
      </Routes>
    </div>
  );
}

export default App;
