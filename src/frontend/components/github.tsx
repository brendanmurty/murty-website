import { useEffect, useState } from "react";
import { type GithubUser } from "$fe/types.ts";

interface GithubInfoProps {
  username: string;
}

export default function GithubInfo({ username }: GithubInfoProps) {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    //
    // Send a request to the backend, which handles auth,
    // hides the API key, and filters the response data
    // instead of returning the raw result from the GitHub API.
    //

    fetch("/api/github-user/")
      .then((response) => {
        if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) {
          return null;
        }

        return response.json() as Promise<GithubUser>;
      })
      .then((data) => {
        if (active) {
          setUser(data);
          setLoaded(true);
        }
      })
      .catch(() => {
        if (active) {
          setLoaded(true);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const values = [
    { className: "github-status", icon: "fa-comment", value: user?.status },
    { className: "github-repos", icon: "fa-code", value: user?.repos ? `${user.repos} Public Repos` : undefined },
    {
      className: "github-prs",
      icon: "fa-code-pull-request",
      value: user?.prs ? `${user.prs} Pull Requests` : undefined
    },
    {
      className: "github-starred",
      icon: "fa-star",
      value: user?.starred ? `${user.starred} Starred Repos` : undefined
    },
    {
      className: "github-following",
      icon: "fa-people-group",
      value: user?.following ? `${user.following} Following` : undefined
    },
    {
      className: "github-followers",
      icon: "fa-people-group",
      value: user?.followers ? `${user.followers} Followers` : undefined
    }
  ];

  //
  // If the backend API response isn't successful, the frontend
  // will fallback to showing only the static GitHub profile link.
  //
  // The changes in the CSS classes support this by lowering the
  // layout shift and flash of new content or vertical compacting.
  //

  return (
    <div id="github-info" className={loaded ? "height-auto" : "print-hidden"}>
      <ul>
        <li className="github-user">
          <span className="icon fa-fw fa-brands fa-github"></span>
          <a href={`https://github.com/${username}`} className="value" title="View my profile on GitHub">{username}</a>
        </li>
        {values.map(({ className, icon, value }) => (
          <li key={className} className={`${className}${value ? " animation-fadein" : " page-hidden"}`}>
            <span className={`icon fa-fw fa-solid ${icon}`}></span>
            <span className="value">{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
