import { useEffect } from "react";

import {
  Navigate,
  useParams,
} from "react-router-dom";

import EditorLayout from "@/shared/layouts/EditorLayout";

import { useProjectStore } from "@/features/files/store/projectStore";

import { useEditorStore } from "@/features/editor/editorStore";

import { useExplorerStore } from "@/features/files/store/explorerStore";
import { loadProjectSession } from "@/shared/utils/projectSession";
import { useCollaboration } from "@/features/collaboration/hooks/useCollaboration";

export default function EditorPage() {

  useCollaboration()

  const { projectId } =
    useParams();

  const {
    projects,
    setActiveProject,
  } = useProjectStore();

  const {
    loadProjectFiles,
  } = useEditorStore();

  const {
    resetExplorer,
  } = useExplorerStore();

  const project =
    projects.find(
      (project) =>
        project.id === projectId
    );

  useEffect(() => {

    if (!project) return;

    // set active project
    setActiveProject(
      project.id
    );

    // load files into editor
    loadProjectFiles(
      project.files
    );

    const session =
  loadProjectSession(
    project.id
  );

   if (session) {

  useEditorStore.setState({
    openTabs:
      session.openTabs,

    activeFileId:
      session.activeFileId,
  });

  useExplorerStore.setState({
    openFolders:
      session.openFolders,
  });

} else {

  resetExplorer();
}
  }, [project]);

  // invalid project
  if (!project) {
    return (
      <Navigate
        to="/dashboard"
      />
    );
  }

  return <EditorLayout />;
}