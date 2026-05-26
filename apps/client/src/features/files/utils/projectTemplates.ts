import type {
  FileSystemItem,
} from "../types/file.types";

import type {
  ProjectTemplate,
} from "../types/project.types";

export function getTemplateFiles(
  template: ProjectTemplate
): FileSystemItem[] {

  switch (template) {

    case "react":
      return [
        {
          id: crypto.randomUUID(),

          type: "folder",

          name: "src",

          children: [
            {
              id: crypto.randomUUID(),

              type: "file",

              name: "App.tsx",

              language:
                "typescript",

              content:
`export default function App() {
  return (
    <div>
      Hello React
    </div>
  );
}
`,
            },

            {
              id: crypto.randomUUID(),

              type: "file",

              name: "main.tsx",

              language:
                "typescript",

              content:
`import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <App />
);
`,
            },
          ],
        },
      ];

    case "node":
      return [
        {
          id: crypto.randomUUID(),

          type: "file",

          name: "server.js",

          language:
            "javascript",

          content:
`console.log("Node server running");`,
        },
      ];

    case "python":
      return [
        {
          id: crypto.randomUUID(),

          type: "file",

          name: "main.py",

          language:
            "python",

          content:
`print("Hello Python")`,
        },
      ];

    default:
      return [];
  }
}