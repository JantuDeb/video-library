import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";

const PlaylistInputForm = ({ createPlaylistHandler, initialValue }) => {
  const [name, setName] = useState(initialValue || "");
  const addClickHandler = () => {
    if (name) createPlaylistHandler(name);
    setName("");
  };
  return (
    <div className="flex items-center gap-1">
      <input
        type="text"
        placeholder="Create new playlist"
        className="input-playlist grow bg-primary"
        autoFocus={true}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="bg-primary p-1 flex center">
        <BiPlus size="20px" className="pointer" onClick={addClickHandler} />
      </span>
    </div>
  );
};

export default PlaylistInputForm;
