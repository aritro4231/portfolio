import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Star } from "lucide-react";

const GITHUB_USERNAME = "aritro4231";
const MAX_REPOS = 6;

function formatLang(lang) {
  return lang ?? "Unknown";
}

function formatErrorMessage(err) {
  const msg = String(err?.message || err || "");
  if (msg.toLowerCase().includes("401")) return "Token is invalid or missing.";
  if (msg.toLowerCase().includes("403")) return "Rate-limited or token lacks access.";
  return "Couldn’t load pinned projects right now.";
}

export default function GitHubProjects() {
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadPinned() {
      try {
        setStatus("loading");
        setErrorMsg("");

        const token = import.meta.env.VITE_GITHUB_TOKEN;
        if (!token) {
          throw new Error(
            "Missing VITE_GITHUB_TOKEN. Add it to your .env and restart the dev server."
          );
        }

        const query = `
          query PinnedRepos($login: String!, $first: Int!) {
            user(login: $login) {
              pinnedItems(first: $first, types: REPOSITORY) {
                nodes {
                  ... on Repository {
                    id
                    name
                    description
                    url
                    stargazerCount
                    updatedAt
                    primaryLanguage { name }
                    owner { login }
                    isPrivate
                    forkCount
                  }
                }
              }
            }
          }
        `;

        const res = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            query,
            variables: { login: GITHUB_USERNAME, first: MAX_REPOS },
          }),
        });

        // If GitHub returns a non-200, show some context
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`GitHub GraphQL error (${res.status}). ${text}`);
        }

        const json = await res.json();

        // GraphQL can return 200 with errors array
        if (json.errors?.length) {
          const first = json.errors[0]?.message || "Unknown GraphQL error";
          throw new Error(first);
        }

        const nodes = json?.data?.user?.pinnedItems?.nodes ?? [];
        if (!Array.isArray(nodes)) throw new Error("Unexpected GitHub response.");

        if (!cancelled) {
          // Pinned order is already in the order you pinned them on GitHub.
          setRepos(nodes);
          setStatus("idle");
        }
      } catch (e) {
        if (!cancelled) {
          setErrorMsg(formatErrorMessage(e));
          setStatus("error");
        }
      }
    }

    loadPinned();

    return () => {
      cancelled = true;
    };
  }, []);

  const visible = useMemo(() => repos.slice(0, MAX_REPOS), [repos]);

  if (status === "loading") {
    return <p className="text-muted-foreground">Loading pinned projects…</p>;
  }

  if (status === "error") {
    return <p className="text-muted-foreground">{errorMsg}</p>;
  }

  // Optional: if you have zero pinned repos
  if (!visible.length) {
    return (
      <p className="text-muted-foreground">
        No pinned repositories found. Pin projects on your GitHub profile and refresh.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {visible.map((repo) => (
        <a
          key={repo.id}
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg"
        >
          {/* Top row */}
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-semibold transition-colors group-hover:text-accent">
              {repo.name}
            </h3>
            <ExternalLink
              className="text-muted-foreground transition-colors group-hover:text-accent"
              size={18}
            />
          </div>

          {/* Description */}
          <p className="mt-3 min-h-[42px] text-sm leading-6 text-muted-foreground">
            {repo.description || "No description available"}
          </p>

          {/* Language + stars */}
          <div className="mt-6 flex items-center justify-between">
            <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-sm text-accent">
              {formatLang(repo.primaryLanguage?.name)}
            </span>

            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Star size={16} />
              {repo.stargazerCount}
            </span>
          </div>

          {/* Bottom row */}
          <div className="mt-6 flex items-center justify-end border-t border-border pt-4">
            <span className="text-sm font-medium text-accent transition-transform group-hover:translate-x-1">
              View →
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
