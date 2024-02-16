import Login from './components/auth/login';
import SignUp from './components/auth/signup';
import Home from './components/home';
import { Routes, Route, BrowserRouter as Router} from 'react-router-dom';
 


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </>
  )
}

export default App;
