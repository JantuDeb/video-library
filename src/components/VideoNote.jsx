import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth/AuthContext";
import { useVideos } from "../context/videos/VideoContext";

const VideoNote = ({ note, videoId }) => {
  const [text, setText] = useState(note);
  const [editing, setEditing] = useState(false);
  const { addNote, deleteNote } = useVideos();
  const { authState } = useAuth();
  const editClickHandler = () => {
    if (!authState.isLogedIn) return toast.error("Logged in user are allowed to add note")
    if (editing) {
      addNote({ note: text, videoId });
    } else if (note && !editing) {
      setText(note);
    }
    setEditing((v) => !v);
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <span>Add Note</span>

        <div className="flex items-center gap-1">
          {note && (
            <button
              onClick={() => deleteNote(videoId)}
              className="transparent p-0 flex items-center"
            >
              <MdDelete size={20} color="red" />
            </button>
          )}
          {editing ? (
            <button
              className="bg-secondary py-1 px-2 radius-md text-white flex items-center"
              onClick={editClickHandler}
            >
              Save
            </button>
          ) : (
            <button
              onClick={editClickHandler}
              className="transparent p-0 flex items-center"
            >
              <BiEdit size={20} color="white" />
            </button>
          )}
        </div>
      </div>
      {editing && (
        <textarea
          className="w-full bg-secondary my-1 px-2 radius-md"
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}
      {note && !editing && (
        <textarea
          className="w-full bg-secondary my-1 px-2 radius-md"
          rows={5}
          disabled
          defaultValue={note}
        />
      )}
    </>
  );
};

export default VideoNote;
