import { useState } from 'react';
import { Octokit } from '@octokit/core';

const useUpdatePRLabel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN; // GitHub token from environment variable
  const owner = 'shaykoteasital'; // Replace with repository owner
  const repo = 'pmc-review'; // Replace with repository name



  // Function to update the labels for a pull request
  const updatePRLabel = async (prId: number, newLabel: string, ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const updatedLabels = [
      // ...currentLabels.filter(label => !updatedLabels.includes(label)), // Filter out labels that aren't selected
      newLabel, // Add the new label
    ];
    const octokit = new Octokit({
      auth:process.env.NEXT_PUBLIC_GITHUB_TOKEN,
    });
    try {
      const response = await octokit.request('PUT /repos/{owner}/{repo}/issues/{issue_number}/labels', {
        owner,
        repo,
        issue_number: prId, // PR number
        labels: updatedLabels, // Labels to apply to the PR
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });

      if (response.status === 200) {
        setSuccess(true);
        console.log('Labels updated successfully:', response.data);
      } else {
        throw new Error('Failed to update labels');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
      console.error('Error updating labels:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    updatePRLabel,
    loading,
    error,
    success,
  };
};

export default useUpdatePRLabel;
