import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Discover from "./pages/discover/Discover";
import Profile from "./pages/profile/Profile";
import Admin from "./pages/admin/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Discover />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;