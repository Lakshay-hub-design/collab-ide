import { useEffect, useState } from "react";

import type { FileSystemItem } from "../types/file.types";

import { isFile } from "../utils/fileGuards";

import { findItemById } from "../utils/findItemById";

import { useEditorStore } from "@/features/editor/editorStore";
import { useExplorerStore } from "../store/explorerStore";

import FileNode from "./FileNode";

import FolderNode from "./FolderNode";

import ContextMenu from "./ContextMenu";

import CreateItemInput from "./CreateItemInput";

type Props = {
  items: FileSystemItem[];
};

export default function FileTree({ items }: Props) {
  const {
    setActiveFile,
    activeFileId,

    createFile,
    createFolder,

    deleteFile,

    renameItem,
  } = useEditorStore();

  const {
  openFolders,

  renamingId,
  renameValue,

  creating,
  newItemName,

  contextMenu,

  toggleFolder,

  setRenamingId,
  setRenameValue,

  setCreating,
  setNewItemName,

  setContextMenu,
} = useExplorerStore();



  useEffect(() => {
    function closeMenu() {
      setContextMenu(null);
    }

    window.addEventListener("click", closeMenu);

    return () => {
      window.removeEventListener("click", closeMenu);
    };
  }, []);

  return (
    <div className="flex flex-col gap-1">
      {items.map((item) => {
        // ================= FILE =================
       
        if (isFile(item)) {
          return (
            <div key={item.id}>
              {/* RENAME INPUT */}
              {renamingId === item.id ? (
                <div className="px-2">
                  <CreateItemInput
                    placeholder="Rename file"
                    value={renameValue}
                    onChange={setRenameValue}
                    onSubmit={() => {
                      renameItem(item.id, renameValue);

                      setRenamingId(null);
                    }}
                    onCancel={() => setRenamingId(null)}
                  />
                </div>
              ) : (
                <FileNode
                  item={item}
                  active={activeFileId === item.id}
                  onClick={() => setActiveFile(item.id)}
                  onDelete={() => deleteFile(item.id)}
                  onContextMenu={(e) => {
                    e.preventDefault();

                    setContextMenu({
                      x: e.clientX,
                      y: e.clientY,
                      itemId: item.id,
                    });
                  }}
                />
              )}
            </div>
          );
        }

        // ================= FOLDER =================

        const isOpen = openFolders.includes(item.id);

        return (
          <div key={item.id}>
            {/* RENAME FOLDER */}
            {renamingId === item.id ? (
              <div className="px-2">
                <CreateItemInput
                  placeholder="Rename folder"
                  value={renameValue}
                  onChange={setRenameValue}
                  onSubmit={() => {
                    renameItem(item.id, renameValue);

                    setRenamingId(null);
                  }}
                  onCancel={() => setRenamingId(null)}
                />
              </div>
            ) : (
              <FolderNode
                item={item}
                isOpen={isOpen}
                onToggle={() => toggleFolder(item.id)}
                onCreateFile={() => {
                  setCreating({
                    parentId: item.id,

                    type: "file",
                  });

                  setNewItemName("");
                }}
                onCreateFolder={() => {
                  setCreating({
                    parentId: item.id,

                    type: "folder",
                  });

                  setNewItemName("");
                }}
                onContextMenu={(e) => {
                  e.preventDefault();

                  setContextMenu({
                    x: e.clientX,
                    y: e.clientY,
                    itemId: item.id,
                  });
                }}
              >
                {/* CREATE INPUT */}
                {creating?.parentId === item.id && (
                  <div className="mb-2">
                    <CreateItemInput
                      placeholder={
                        creating.type === "file" ? "filename.ts" : "folder name"
                      }
                      value={newItemName}
                      onChange={setNewItemName}
                      onSubmit={() => {
                        if (creating.type === "file") {
                          createFile(item.id, newItemName);
                        }

                        if (creating.type === "folder") {
                          createFolder(item.id, newItemName);
                        }

                        setCreating(null);

                        setNewItemName("");
                      }}
                      onCancel={() => setCreating(null)}
                    />
                  </div>
                )}

                {/* RECURSION */}
                <FileTree items={item.children} />
              </FolderNode>
            )}
          </div>
        );
      })}

      {/* CONTEXT MENU */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onRename={() => {
            const targetItem = findItemById(items, contextMenu.itemId);

            setRenamingId(contextMenu.itemId);

            setRenameValue(targetItem?.name || "");

            setContextMenu(null);
          }}
          onDelete={() => {
            deleteFile(contextMenu.itemId);

            setContextMenu(null);
          }}
        />
      )}
    </div>
  );
}
