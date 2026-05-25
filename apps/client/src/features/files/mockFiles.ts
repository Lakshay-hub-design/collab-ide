import type { FileSystemItem } from "./types/file.types";

export const mockFiles: FileSystemItem[] = [
  {
    id: "folder-src",
    type: "folder",
    name: "src",

    children: [
      {
        id: "1",
        type: "file",
        name: "App.tsx",
        language: "typescript",
        content: `export default function App() {
          return <div>Hello IDE</div>;
        }`,
      },

      {
        id: "2",
        type: "file",
        name: "main.tsx",
        language: "typescript",
        content: `console.log("main");`,
      },
    ],
  },

  {
    id: "folder-public",
    name: "public",
    type: "folder",

    children: [
      {
        id: "3",
        type: "file",
        name: "index.css",
        language: "css",
        content: `body {
          margin: 0;
        }`,
      },
    ],
  },
];