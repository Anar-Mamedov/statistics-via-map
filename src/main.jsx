import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./store/redux/index.js";
import { Provider as ReduxStoreProvider } from "react-redux";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxStoreProvider store={store}>
      <App />
    </ReduxStoreProvider>
  </React.StrictMode>
);
