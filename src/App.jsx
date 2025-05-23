import { BrowserRouter, Routes, Route } from 'react-router-dom';

import WelcomeCentralComponent from "./Welcome/Welcome.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<WelcomeCentralComponent/>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
