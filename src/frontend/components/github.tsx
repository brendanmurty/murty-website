interface GithubInfoProps {
  username: string;
}

export default function GithubInfo({ username }: GithubInfoProps) {
  return (
    <div id="github-info-root" data-username={username}>
      <div id="github-info">
        <ul>
          <li className="github-user">
            <span className="icon fa-fw fa-brands fa-github"></span>
            <a href={`https://github.com/${username}`} className="value" title="View my profile on GitHub">
              {username}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
