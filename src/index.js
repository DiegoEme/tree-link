import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import LoginView from "./routes/loginView";
import DashboardView from "./routes/dashboardView";
import EditProfileView from "./routes/editProfileView";
import SignoutView from "./routes/signoutView";
import ChooseUsernameView from "./routes/chooseUsernameView";
import PublicProfileView from "./routes/publicProfileView";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/dashboard" element={<DashboardView />} />
      <Route path="/dashboard/profile" element={<EditProfileView />} />
      <Route path="/signout" element={<SignoutView />} />
      <Route path="/choose-username" element={<ChooseUsernameView />} />
      <Route path="/user/:id" element={<PublicProfileView />} />
    </Routes>
  </BrowserRouter>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
