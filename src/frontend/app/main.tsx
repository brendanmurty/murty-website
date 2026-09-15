import { createRoot } from "react-dom/client";
import GithubInfo from "./github.tsx";

// This file exists to allow the frontend to interact dynamically
// with the internal backend withing Lume's static build output.

const container = document.getElementById("github-info-root");
if (container) {
  createRoot(container).render(
    <GithubInfo username={container.dataset.username ?? ""} />
  );
}
