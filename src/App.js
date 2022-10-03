import Home from './Pages/Home';
import Main from './Pages/Main';
import Final from './Pages/Final';
import Test from './Pages/Test';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.REACT_APP_PUBLIC_URL}>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/main" element={<Main />} />
        <Route path="/final/:date" element={<Final />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
