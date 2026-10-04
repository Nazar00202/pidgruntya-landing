import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { initAnalytics } from "./lib/analytics";
import { captureAttribution } from "./lib/utm";
import "./index.css";

captureAttribution();
initAnalytics();

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App path={window.location.pathname} />
  </StrictMode>
);

// Сторінки пререндерені під час збірки → «оживляємо» готовий HTML.
// У режимі розробки (npm run dev) HTML порожній → рендеримо з нуля і ставимо title.
if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  import("./seo").then(({ pageMeta }) => {
    document.title = pageMeta(window.location.pathname.replace(/\/+$/, "") || "/").title;
  });
  createRoot(root).render(app);
}
