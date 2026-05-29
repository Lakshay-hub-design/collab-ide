import {
  Plus,
  Users,
} from "lucide-react";

import { generateRoomId } from "../utils/generateRoomId";
import { useCollabStore } from "../collabStore";
import { useState } from "react";

export default function CollaborationPanel() {

  const {
    roomId,

    connected,

    collaborators,

    setRoomId,

    setIsHost,
  } = useCollabStore();

  function handleCreateRoom() {

    const newRoomId = generateRoomId();

    setRoomId(newRoomId);

    setIsHost(true);

    console.log("Created room:", newRoomId);
  }

  const [joinCode, setJoinCode] = useState("");

  return (
    <div
      className="
        h-full p-5
        overflow-auto
      "
    >
      {/* HEADER */}
      <div>
        <h2
          className="
            text-xl font-semibold
          "
        >
          Collaboration
        </h2>

        <p
          className="
            mt-1 text-sm
            text-[var(--text-secondary)]
          "
        >
          Invite teammates and collaborate in real time.
        </p>
      </div>

      {/* ROOM */}
      <div
        className="
          mt-6 rounded-2xl
          border border-[var(--border)]
          p-4
        "
      >
        {!connected ? (
          <button
            onClick={handleCreateRoom}
            className="
              w-full h-11 rounded-xl
              bg-violet-500
              hover:bg-violet-600
              text-white
              flex items-center
              justify-center gap-2
              transition-colors
            "
          >
            <Plus size={18} />
            Create Room
          </button>
        ) : (
          <div>
            <div
              className="
                text-sm
                text-[var(--text-secondary)]
              "
            >
              Room Code
            </div>

            <div
              className="
                mt-2 h-11 px-4
                rounded-xl
                border border-[var(--border)]
                bg-[var(--bg)]
                flex items-center
                font-mono tracking-widest
              "
            >
              {roomId}
            </div>
          </div>
        )}
      </div>
      <div
        className="
    mt-4 rounded-2xl
    border border-[var(--border)]
    p-4
  "
      >
        <div
          className="
      text-sm font-medium
    "
        >
          Join Room
        </div>

        <div className="mt-3 flex gap-2">
          <input
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            placeholder="ROOM ID"
            className="
                flex-1 h-11 px-3
                w-1/2
                rounded-xl
                bg-[var(--bg)]
                border border-[var(--border)]
                outline-none
            "
          />

          <button
            onClick={() => {
              if (!joinCode) return;

              setRoomId(joinCode);

              setIsHost(false);
            }}
            className="
                px-4 rounded-xl
                bg-violet-500
                hover:bg-violet-600
            "
          >
            Join
          </button>
        </div>
      </div>
    <div
    className="
        mt-4 flex items-center gap-2
        text-sm
    "
    >

    <div
        className={`
        h-2 w-2 rounded-full
        ${
            connected
            ? "bg-green-500"
            : "bg-red-500"
        }
        `}
    />

    {connected
        ? "Connected"
        : "Disconnected"}

    </div>
      {/* USERS */}
      <div className="mt-6">
        <div
          className="
            flex items-center gap-2
            text-sm font-medium
          "
        >
          <Users size={16} />
          Collaborators
        </div>

        <div className="mt-3 space-y-2">
          {collaborators.length === 0 ? (
            <div
              className="
                text-sm
                text-[var(--text-secondary)]
              "
            >
              No collaborators yet.
            </div>
          ) : (
            collaborators.map((user) => (
              <div
                key={user.id}
                className="
                    h-11 px-3 rounded-xl
                    border border-[var(--border)]
                    flex items-center gap-3
                  "
              >
                <div
                  className="
                      h-8 w-8 rounded-full
                      bg-violet-500
                    "
                />

                <div>
                  <div className="text-sm">{user.name}</div>

                  <div
                    className="
                        text-xs
                        text-[var(--text-secondary)]
                      "
                  >
                    Active
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}