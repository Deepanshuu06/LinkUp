import React from "react";

import { LoginForm } from "./components/login-form";
import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { SignupForm } from "./components/SignupForm";
import Profile from "./components/Profile";
import Feed from "./components/Feed";

const App = () => {
  return (
    <div>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<Feed/>} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm/>} />
              <Route path="/profile" element={<Profile/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
