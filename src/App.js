import Home from './Pages/Home';
import Main from './Pages/Main';
import Final from './Pages/Final';
import Test from './Pages/Test';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/Astronomify">
      <Routes>
        <Route exact path="/Astronomify" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/main" element={<Main />} />
        <Route path="/final/:date" element={<Final />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
