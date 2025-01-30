"use client";
import React, { useEffect, useState } from "react";
import { Card, Dropdown, Menu, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Octokit } from "octokit";

const gridStyle: React.CSSProperties = {
  textAlign: "left",
};

const onClick = ({ key }: { key: string }) => {
  message.info(`Click on item ${key}`);
};

const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="1">1st menu item</Menu.Item>
    <Menu.Item key="2">2nd menu item</Menu.Item>
    {/* <Menu.Item key="3">3rd menu item</Menu.Item> */}
  </Menu>
);

export default function DashboardTable() {
  const [pullRequests, setPullRequests] = useState<any[]>([]);

  const owner = "shaykoteasital"; // Your GitHub username
  const repo = "pmc-review"; // Replace with your actual repository name
  const token = "your-personal-access-token"; // Replace with your GitHub token

  useEffect(() => {
    const fetchPullRequests = async () => {
      try {
        const octokit = new Octokit({
          auth: token, // Provide authentication token
        });

        const response = await octokit.request(
          "GET /repos/{owner}/{repo}/pulls",
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
