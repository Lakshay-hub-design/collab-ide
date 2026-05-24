type Props = {
  command: string;
};

export async function executeTerminalCommand({
  command,
}: Props) {
  const trimmed =
    command.trim();

  // CLEAR
  if (trimmed === "clear") {
    return {
      type: "clear",
    };
  }

  // HELP
  if (trimmed === "help") {
    return {
      type: "output",

      text: `
Available commands:

help      Show commands
clear     Clear terminal
echo      Print text
date      Current date
about     IDE info
      `,
    };
  }

  // DATE
  if (trimmed === "date") {
    return {
      type: "output",

      text: new Date().toString(),
    };
  }

  // ABOUT
  if (trimmed === "about") {
    return {
      type: "output",

      text: `
DevStudio IDE
Realtime collaborative browser IDE
Built with React + Monaco + Node
      `,
    };
  }

  // ECHO
  if (
    trimmed.startsWith("echo ")
  ) {
    return {
      type: "output",

      text: trimmed.replace(
        "echo ",
        ""
      ),
    };
  }

  return {
    type: "error",

    text: `Command not found: ${trimmed}`,
  };
}