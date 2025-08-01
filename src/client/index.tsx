import React from "react";
import { hydrateRoot } from "react-dom/client";
import Home from "../pages/Home";
import "./styles/home.scss";

const initialData = (window as any).__INITIAL_DATA__;

hydrateRoot(
  document.getElementById("root")!,
  <Home initialData={initialData} />
);
