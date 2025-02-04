"use client";
import { Card, Image, Select } from "antd";
import Link from "next/link";
import { useState } from "react";
import useUpdatePRLabel from "../hook/updateLabel";
import useGitLabel from "../hook/useGetLabels";
import usePullRequests from "../hook/usePullRequest";

export default function DashboardTable() {
  const owner = "shaykoteasital";
  const repo = "pmc-review";
  const { pullRequests } = usePullRequests(owner, repo);
  const { gitLabel } = useGitLabel(owner, repo);
  const { updatePRLabel } = useUpdatePRLabel();
  console.log("PullRequest", pullRequests);
  console.log("GitLabel", gitLabel);

  const [selectedLabel, setSelectedLabel] = useState<{ [key: number]: string }>(
    {}
  );

  const handleStatusChange = async (
    value: string,
    prId: number,
    currentLabels: string[]
  ) => {
    console.log("handlestatusCnage", value, prId, currentLabels);
    const newLabel =
      gitLabel.find((lbl) => lbl.id === Number(value))?.name || "";
    console.log("New Label", newLabel);
    if (!newLabel) return;

    setSelectedLabel((prev) => ({ ...prev, [prId]: newLabel }));
    await updatePRLabel(prId, newLabel);
  };

  return (
    <div>
      {pullRequests.map((item) => {
        const existingLabels = item?.labels
          ? item?.labels?.map((label) => label.name)
          : [];
        const matchedLabel =
          existingLabels?.find((label) =>
            gitLabel.some((lbl) => lbl.name === label)
          ) || "No Label";

        return (
          <Card
            key={item.id}
            title={item.title}
            bordered
            style={{ width: "100%", marginBottom: "16px" }}
          >
            {item?.user && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Image
                  className="bg-cover rounded-full"
                  width={40}
                  height={40}
                  src={item.user.avatar_url}
                  alt="User Avatar"
                />
                <h6 className="text-lg">{item.user.login}</h6>
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                  {selectedLabel[item.id] || matchedLabel}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between mt-3">
              <Link target="_blank" href={item?.html_url}>
                {item?.html_url}
              </Link>
              <Select
                placeholder="Status"
                options={gitLabel.map((lbl) => ({
                  value: lbl.id,
                  label: lbl.name,
                }))}
                onChange={(value) =>
                  handleStatusChange(value, item?.number, existingLabels)
                }
                value={
                  selectedLabel[item.id] ||
                  (matchedLabel !== "No Label" ? matchedLabel : undefined)
                }
              />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
