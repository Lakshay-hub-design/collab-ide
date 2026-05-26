import {
  Atom,
  FileCode2,
  Server,
  File,
} from "lucide-react";

export const PROJECT_TEMPLATES = [
  {
    id: "react",

    name: "React",

    icon: Atom,

    description:
      "Frontend React workspace",
  },

  {
    id: "node",

    name: "Node",

    icon: Server,

    description:
      "Backend Node.js server",
  },

  {
    id: "python",

    name: "Python",

    icon: FileCode2,

    description:
      "Python runtime project",
  },

  {
    id: "blank",

    name: "Blank",

    icon: File,

    description:
      "Empty workspace",
  },
] as const;