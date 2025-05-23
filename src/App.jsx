import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import WelcomeCentralComponent from "./Welcome/Welcome.jsx";
import LoginComponent from "./AccessControl/Login.jsx";
import RegisterComponent from "./AccessControl/Register.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/welcome" replace />} />
            <Route path="/welcome" element={<WelcomeCentralComponent/>} />
            <Route path="/login" element={<LoginComponent/>} />
            <Route path="/register" element={<RegisterComponent/>}/>

        </Routes>
      </BrowserRouter>
  )
}

export default App
