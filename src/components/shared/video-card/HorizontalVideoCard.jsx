import React from "react";
import { Link } from "react-router-dom";
import { formatedDate } from "../../../utils/utils";

const HorizontalVideoCard = ({ video }) => {
  const {
    thumbnails,
    title,
    channelTitle,
    statistics,
    duration,
    _id,
    createdAt,
  } = video;

  return (
    <div className="flex">
      <Link to={`/video?videoId=${_id}`} className="card-top m-1">
        <img
          src={thumbnails?.url}
          alt={title}
          width="200px"
        />
        <span className="duration">{duration}</span>
      </Link>
      <div className="card-info flex-col m-1">
        <Link to={`/video?videoId=${_id}`} className="video-title">
          {title}
        </Link>
        <p className="m-0 text-gray">{channelTitle}</p>
        <div className="flex text-gray">
          <span className="views">{statistics?.viewCount} views </span>
          <span>{createdAt && formatedDate(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default HorizontalVideoCard;
