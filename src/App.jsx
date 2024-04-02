import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage, SignInPage, SignUpPage } from "./Page";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/sign_up" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
