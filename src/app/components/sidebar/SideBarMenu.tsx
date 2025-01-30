"use client";
import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { GetProp, MenuProps } from "antd";
import { Menu } from "antd";
import React from "react";
import "./custom.css";

type MenuItem = GetProp<MenuProps, "items">[number];

const items: MenuItem[] = [
  {
    key: "1",
    icon: <MailOutlined />,
    label: "Navigation One",
  },
  {
    key: "2",
    icon: <CalendarOutlined />,
    label: "Navigation Two",
  },
  {
    key: "sub1",
    label: "Navigation Two",
    icon: <AppstoreOutlined />,
    children: [
      { key: "3", label: "Option 3" },
      { key: "4", label: "Option 4" },
      {
        key: "sub1-2",
        label: "Submenu",
        children: [
          { key: "5", label: "Option 5" },
          { key: "6", label: "Option 6" },
        ],
      },
    ],
  },
  {
    key: "sub2",
    label: "Navigation Three",
    icon: <SettingOutlined />,
    children: [
      { key: "7", label: "Option 7" },
      { key: "8", label: "Option 8" },
      { key: "9", label: "Option 9" },
      { key: "10", label: "Option 10" },
    ],
  },
  {
    key: "link",
    icon: <LinkOutlined />,
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Ant Design
      </a>
    ),
  },
];

const SideBarMenu: React.FC = () => {
  //   const [mode, setMode] = useState<"vertical" | "inline">("inline");
  //   const [theme, setTheme] = useState<MenuTheme>("light");

  //   const changeMode = (value: boolean) => {
  //     setMode(value ? "vertical" : "inline");
  //   };

  //   const changeTheme = (value: boolean) => {
  //     setTheme(value ? "dark" : "light");
  //   };

  return (
    <>
      {/* <Switch onChange={changeMode} /> Change Mode
      <Divider type="vertical" />
      <Switch onChange={changeTheme} /> Change Style
      <br />
      <br /> */}
      <Menu
        className="custom-menu"
        defaultSelectedKeys={["1"]}
        items={items}
        // antMenuRoot="ant-menu-root"
        mode="inline"
      />
    </>
  );
};

export default SideBarMenu;
