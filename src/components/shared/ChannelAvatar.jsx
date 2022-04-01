import React from "react";
import { Link } from "react-router-dom";

const ChannelAvatar = () => {
  return (
    <Link to="/channel/" className="channel">
      <img
        className="avatar-small "
        src="https://yt3.ggpht.com/ytc/AKedOLTms-6p1_2cRI4fjiy0RpXYsoJrMFnmRbHKVkYO=s68-c-k-c0x00ffffff-no-rj"
        alt="channel avatar"
      />
    </Link>
  );
};

export default ChannelAvatar;
