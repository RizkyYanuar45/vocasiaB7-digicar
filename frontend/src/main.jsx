import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "aos/dist/aos.css";
import "animate.css";
import AOS from "aos";

import App from "./App.jsx";
AOS.init();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
