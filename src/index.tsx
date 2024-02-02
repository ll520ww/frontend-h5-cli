import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { ConfigProvider } from "antd-mobile";
import zhCN from "antd-mobile/es/locales/zh-CN";
import "./global.less";
import "antd-mobile/es/global";

const container: any = document.getElementById("app");
const root = createRoot(container);
root.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
);
