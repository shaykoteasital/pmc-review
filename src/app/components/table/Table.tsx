"use client";
import React, { useEffect, useState } from "react";
import { Card, Dropdown, Menu, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Octokit } from "octokit";

const gridStyle: React.CSSProperties = {
  textAlign: "left",
};

const onClick = ({ key }: { key: string }) => {
  message.info(`Clicked on item ${key}`);
};

const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="1">1st menu item</Menu.Item>
    <Menu.Item key="2">2nd menu item</Menu.Item>
  </Menu>
);

interface PullRequest {
  id: number;
  html_url: string;
  title: string;
}

export default function DashboardTable() {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);

  const owner = "shaykoteasital"; // Your GitHub username
  const repo = "pmc-review"; // Your repository name

  useEffect(() => {
    const fetchPullRequests = async () => {
      try {
        const octokit = new Octokit({
          auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN, // Use an environment variable for GitHub token
        });

        // Corrected the API request URL here ("/repos/{owner}/{repo}/pulls")
        const response = await octokit.request(
          "GET /repos/{owner}/{repo}/issues",
          {
            owner,
            repo,
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );

        console.log("Pull Requests:", response.data);
        setPullRequests(response.data);
      } catch (error) {
        console.error("Error fetching pull requests:", error);
      }
    };

    fetchPullRequests();
  }, []);

  return (
    <Card className="text-center" title="PMC Merge Request Review">
      {pullRequests.length > 0 ? (
        pullRequests.map((pr) => (
          <Card.Grid key={pr.id} style={gridStyle}>
            <a href={pr.html_url} target="_blank" rel="noopener noreferrer">
              {pr.title}
            </a>
          </Card.Grid>
        ))
      ) : (
        <Card.Grid style={gridStyle}>No Pull Requests</Card.Grid>
      )}
      <Card.Grid style={gridStyle}>
        <Dropdown overlay={menu}>
          <a onClick={(e) => e.preventDefault()}>
            Hover me, Click menu item <DownOutlined />
          </a>
        </Dropdown>
      </Card.Grid>
    </Card>
  );
}
