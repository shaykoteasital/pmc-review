import { useState, useEffect } from "react";
import { Octokit } from "@octokit/core";

interface GitHubLabel {
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    default: boolean;
    description: string | null;
  }
  

const useGitLabel = (owner: string, repo: string) => {
  const [gitLabel, setGitLabel] = useState<GitHubLabel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPullRequests = async () => {
      try {
        const octokit = new Octokit({
          auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN, 
        });

        const response = await octokit.request("GET /repos/{owner}/{repo}/labels", {
          owner,
          repo,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });

      

        setGitLabel(response?.data);
      } catch (err) {
        setError("Failed to fetch pull requests.");
        console.error("Error fetching pull requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPullRequests();
  }, [owner, repo]);

  return { gitLabel, loading, error };
};

export default useGitLabel;
