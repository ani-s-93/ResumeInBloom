import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ResumeEditor from "./pages/ResumeEditor";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>


       <Route
    path="/resume/:id"
    element={
        <ProtectedRoute>
            <ResumeEditor />
        </ProtectedRoute>
    }
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;