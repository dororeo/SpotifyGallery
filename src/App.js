import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';


function App() {
  return (
    <div className="App">
    <Routes>

        <Route exact path='/' Component={Login} />
        <Route exact path='/home' Component={Home} />

    </Routes>
  </div>
  );
}

export default App;