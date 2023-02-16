import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home';
import Login from './Pages/Login';
import K21 from './Pages/K21';
import ErrorPage from './Pages/ErrorPage';


function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/k21' element={<K21 />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  </Router>
  )
}

export default App;
