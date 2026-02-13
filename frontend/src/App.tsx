import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

// pages
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import History from "./pages/History";
import Status from "./pages/Status";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/history" element={<History />} />
        <Route path="/status" element={<Status />} />
      </Route>
    </Routes>
  );
}

export default App;