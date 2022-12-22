import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

import { createDriver, Neo4jProvider } from "use-neo4j";

const driver = createDriver(
  "neo4j",
  "localhost",
  7687,
  "neo4j",
  "project_ws",
  {}
);

console.log(driver);
//database="symptom_disease"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Neo4jProvider driver={driver}>
      <App />
    </Neo4jProvider>
  </React.StrictMode>
);
