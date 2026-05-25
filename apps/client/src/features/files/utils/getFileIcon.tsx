import {
  VscFile,
  VscJson,
} from "react-icons/vsc";

import {
  SiTypescript,
  SiJavascript,
  SiCss,
  SiHtml5,
  SiReact,
} from "react-icons/si";

type Props = {
  fileName: string;
};

export function getFileIcon({
  fileName,
}: Props) {
  if (fileName.endsWith(".tsx") || fileName.endsWith(".jsx")) {
    return (
      <SiReact className="text-cyan-400" />
    );
  }

  if (fileName.endsWith(".ts")) {
    return (
      <SiTypescript className="text-blue-400" />
    );
  }

  if (fileName.endsWith(".js")) {
    return (
      <SiJavascript className="text-yellow-300" />
    );
  }

  if (fileName.endsWith(".css")) {
    return (
      <SiCss className="text-blue-500" />
    );
  }

  if (fileName.endsWith(".html")) {
    return (
      <SiHtml5 className="text-orange-500" />
    );
  }

  if (fileName.endsWith(".json")) {
    return (
      <VscJson className="text-yellow-400" />
    );
  }

  return <VscFile />;
}