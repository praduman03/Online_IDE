import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Code from "./pages/Code";
import Submission from "./pages/Submission";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/code" element={<Code />} />
        <Route path="/submission" element={<Submission />} />
      </Routes>
    </div>
  );
}

export default App;
