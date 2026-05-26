import {
  Lock,
  X,
} from "lucide-react";

import { motion } from "framer-motion";

import { useState } from "react";

import type {
  ProjectTemplate,
  ProjectVisibility,
} from "@/features/files/types/project.types";

import { PROJECT_TEMPLATES } from "../constants/projectTemplates";

import TemplateCard from "./TemplateCard";

type Props = {
  open: boolean;

  onClose: () => void;

  onCreate: (
    name: string,

    template: ProjectTemplate,

    visibility: ProjectVisibility
  ) => void;
};

export default function CreateProjectModal({
  open,
  onClose,
  onCreate,
}: Props) {

  const [
    projectName,
    setProjectName,
  ] = useState("");

  const [
    template,
    setTemplate,
  ] =
    useState<ProjectTemplate>(
      "react"
    );

  const [
    visibility,
    setVisibility,
  ] =
    useState<ProjectVisibility>(
      "private"
    );

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/60
        backdrop-blur-sm
        flex items-center
        justify-center
        p-4
      "
    >

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
        }}
        className="
          w-full max-w-4xl
          rounded-3xl
          border border-[var(--border)]
          bg-[var(--panel)]
          overflow-hidden
          shadow-2xl
        "
      >

        {/* HEADER */}
        <div
          className="
            h-20 px-8
            border-b border-[var(--border)]
            flex items-center
            justify-between
          "
        >

          <div>

            <h2
              className="
                text-2xl font-bold
              "
            >
              Create New Project
            </h2>

            <p
              className="
                mt-1 text-sm
                text-[var(--text-secondary)]
              "
            >
              Configure your workspace.
            </p>

          </div>

          <button
            onClick={onClose}
            className="
              h-10 w-10 rounded-xl
              hover:bg-[var(--hover)]
              flex items-center
              justify-center
            "
          >
            <X size={18} />
          </button>

        </div>

        {/* CONTENT */}
        <div className="px-8 py-2">

          {/* PROJECT NAME */}
          <div>

            <label
              className="
                text-sm font-medium
              "
            >
              Project Name
            </label>

            <input
              value={projectName}
              onChange={(e) =>
                setProjectName(
                  e.target.value
                )
              }
              placeholder="my-awesome-app"
              className="
                mt-2 w-full h-12 px-4
                rounded-2xl
                border border-[var(--border)]
                bg-[var(--bg)]
                outline-none
                text-lg
              "
            />

          </div>

          {/* TEMPLATE GRID */}
          <div className="mt-8">

            <h3
              className="
                text-lg font-semibold
                mb-4
              "
            >
              Select Template
            </h3>

            <div
              className="
                grid grid-cols-2
                md:grid-cols-4
                gap-4
              "
            >

              {PROJECT_TEMPLATES.map(
                (item) => (
                  <TemplateCard
                    key={item.id}
                    title={item.name}
                    description={
                      item.description
                    }
                    icon={item.icon}
                    selected={
                      template ===
                      item.id
                    }
                    onClick={() =>
                      setTemplate(
                        item.id as ProjectTemplate
                      )
                    }
                  />
                )
              )}

            </div>

          </div>

          {/* VISIBILITY */}
          <div
            className="
              mt-8 rounded-2xl
              border border-[var(--border)]
              bg-[var(--bg)]
              p-3 flex items-center
              justify-between
            "
          >

            <div className="flex gap-4">

              <div
                className="
                  h-12 w-12 rounded-xl
                  bg-violet-500/10
                  flex items-center
                  justify-center
                  text-violet-400
                "
              >
                <Lock size={22} />
              </div>

              <div>

                <h3
                  className="
                    font-semibold
                  "
                >
                  Private Repository
                </h3>

                <p
                  className="
                    text-sm mt-1
                    text-[var(--text-secondary)]
                  "
                >
                  Only invited collaborators can access this project.
                </p>

              </div>

            </div>

            <button
              onClick={() =>
                setVisibility(
                  visibility ===
                    "private"
                    ? "public"
                    : "private"
                )
              }
              className={`
                relative w-14 h-8 rounded-full
                transition-colors
                ${
                  visibility ===
                  "private"
                    ? "bg-violet-600"
                    : "bg-zinc-600"
                }
              `}
            >

              <div
                className={`
                  absolute top-1 h-6 w-6 rounded-full
                  bg-white transition-all
                  ${
                    visibility ===
                    "private"
                      ? "left-7"
                      : "left-1"
                  }
                `}
              />

            </button>

          </div>

        </div>

        {/* FOOTER */}
        <div
          className="
            h-18 px-8
            border-t border-[var(--border)]
            flex items-center
            justify-end gap-4
          "
        >

          <button
            onClick={onClose}
            className="
              h-12 px-6 rounded-xl
              hover:bg-[var(--hover)]
            "
          >
            Cancel
          </button>

          <button
            onClick={() => {

              if (
                !projectName.trim()
              )
                return;

              onCreate(
                projectName,

                template,

                visibility
              );

              setProjectName("");

              onClose();
            }}
            className="
              h-12 px-8 rounded-xl
              bg-gradient-to-r
              from-violet-500
              to-purple-600
              text-white font-medium
            "
          >
            Create Project
          </button>

        </div>

      </motion.div>

    </div>
  );
}