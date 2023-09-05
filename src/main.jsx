//import studio from "@theatre/studio";
//import extension from "@theatre/r3f/dist/extension";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import TopDiv from "./TopDiv";
import "./index.css";

//studio.extend(extension);
//studio.initialize();

ReactDOM.createRoot(document.getElementById("root-div")).render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <BrowserRouter>
        <TopDiv />
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);
