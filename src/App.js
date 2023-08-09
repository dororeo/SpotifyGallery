import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" Component={Login} />
        <Route exact path="/home" Component={Home} />
        <Route exact path="*" Component={NotFound} />
      </Routes>
    </div>
  );
}

export default App;
