import { createRoot } from "react-dom/client";
import GithubInfo from "./github.tsx";

const container = document.getElementById("github-info-root");

if (container) {
  createRoot(container).render(
    <GithubInfo username={container.dataset.username ?? ""} />
  );
}
