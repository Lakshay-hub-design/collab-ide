export type ProjectSession = {
  openTabs: string[];

  activeFileId: string;

  openFolders: string[];
};

export function getSessionKey(
  projectId: string
) {
  return `project-session-${projectId}`;
}

export function saveProjectSession(
  projectId: string,

  session: ProjectSession
) {
  localStorage.setItem(
    getSessionKey(projectId),

    JSON.stringify(session)
  );
}

export function loadProjectSession(
  projectId: string
): ProjectSession | null {

  const raw =
    localStorage.getItem(
      getSessionKey(projectId)
    );

  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}