import { createRoot } from "react-dom/client";
import "@fontsource/newsreader/400.css";
import "@fontsource/newsreader/400-italic.css";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
