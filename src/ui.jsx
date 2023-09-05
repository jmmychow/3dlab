import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import UITest from './UITest';
import './ui.css';

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <UITest />
    </Suspense>
  </React.StrictMode>
);
