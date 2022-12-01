import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import Home from "./components/Home";
import Movie from "./components/Movie";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movie />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
