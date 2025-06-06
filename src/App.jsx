import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import WelcomeCentralComponent from "./Welcome/Welcome.jsx";
import LoginComponent from "./AccessControl/Login.jsx";
import RegisterComponent from "./AccessControl/Register.jsx";
import PasswordResetComponent from "./AccessControl/PasswordReset.jsx";
import EmailConfirmComponent from "./AccessControl/EmailConfirm.jsx";
import HomeComponent from "./Common/HomeComponent.jsx";
import { ThemeProvider } from "@mui/material";
import TheShadowDealsTheme from "./Theme.jsx";
import CheckEmailComponent from "./AccessControl/CheckEmail.jsx";
import {Provider} from "react-redux";
import store from "./Redux/store.js"

function App() {
  return (
      <Provider store={store}>
          <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/welcome" replace />} />
                    <Route path="/welcome" element={<WelcomeCentralComponent/>} />
                    <Route path="/login" element={<LoginComponent/>} />
                    <Route path="/register" element={<RegisterComponent/>}/>
                    <Route path="/password-reset" element={<PasswordResetComponent/>}/>
                    <Route path="/confirm" element={<EmailConfirmComponent/>}/>
                    <Route path="/check-email"
                           element={
                               <ThemeProvider theme={TheShadowDealsTheme}>
                                <CheckEmailComponent/>
                               </ThemeProvider>
                           }
                    />
                    <Route
                        path="/home"
                        element={
                            <ThemeProvider theme={TheShadowDealsTheme}>
                                <HomeComponent />
                            </ThemeProvider>
                        }
                    />
                </Routes>
          </BrowserRouter>
      </Provider>
  )
}

export default App
