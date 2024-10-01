import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Author from './components/Author';
import AddDoc from './components/AddDoc';
import DisplayAll from './components/DisplayAll';
import DisplayMost from './components/DisplayMost';
import './App.css'


function App() {

  return (
    <>
<Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path='/author' element={<Author />} />
                <Route path='/addDoc' element={<AddDoc />} />
                <Route path='/displayAll' element={<DisplayAll />} />
                <Route path='/displayMost' element={<DisplayMost />} />

            </Routes>
        </Router>
    </>
  )
}

export default App
