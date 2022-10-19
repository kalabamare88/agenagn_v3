import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style.css";
import store from "./store";
import { Provider } from "react-redux";
import { UserAuthContextProvider } from "./context/UserAuthContext";
ReactDOM.render(
  <React.StrictMode>
    <UserAuthContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
    </UserAuthContextProvider>
    
  </React.StrictMode>,
  document.getElementById("root")
);
