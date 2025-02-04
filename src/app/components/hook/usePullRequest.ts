import { useState, useEffect } from "react";
import { Octokit } from "@octokit/core";

interface PullRequest {
  id: number;
  html_url: string;
  title: string;
  user: {
    login: string;
    avatar_url: string;
  } | null;
}

const usePullRequests = (owner: string, repo: string) => {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPullRequests = async () => {
      try {
        const octokit = new Octokit({
          auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN, 
        });

        const response = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
          owner,
          repo,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });

        // const pullRequestsData: PullRequest[] = response.data.map((pr: { id: number; html_url: string; title: string; user: { login: string; avatar_url: string } | null }) => ({
        //   id: pr.id,
        //   html_url: pr.html_url,
        //   title: pr.title,
        //   user: pr.user
        //     ? {
        //         login: pr.user.login,
        //         avatar_url: pr.user.avatar_url,
        //       }
        //     : null,
        // }));

        setPullRequests(response.data);
      } catch (err) {
        setError("Failed to fetch pull requests.");
        console.error("Error fetching pull requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPullRequests();
  }, [owner, repo]);

  return { pullRequests, loading, error };
};

export default usePullRequests;
