export const UPDATE_LIKE_COUNT = "UPDATE_LIKE_COUNT";
export const UPDATE_VIEW_COUNT = "UPDATE_VIEW_COUNT";
export const GET_VIDEOS = "GET_VIDEOS";
export const GET_CURRENT_VIDEO = "GET_CURRENT_VIDEO";
export const ADD_NOTE = "ADD_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const GET_NOTE = "GET_NOTE";
export const LOADING = "LOADING";
export const ERROR = "ERROR";

export const videoReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_VIDEOS:
      return { ...state, videos: payload.videos };
    case GET_CURRENT_VIDEO:
      return {
        ...state,
        currentVideo: { ...state.currentVideo, ...payload.video },
      };
    case UPDATE_LIKE_COUNT:
      return updateCount({ state, payload, type: "likeCount" });
    case UPDATE_VIEW_COUNT:
      return updateCount({ state, payload, type: "viewCount" });
    case ADD_NOTE:
    case GET_NOTE:
      return {
        ...state,
        currentVideo: {
          ...state.currentVideo,
          note: payload.note,
        },
      };
    case DELETE_NOTE:
      return {
        ...state,
        currentVideo: {
          ...state.currentVideo,
          note: "",
        },
      };

    case LOADING:
      return { ...state, loading: payload.loading };
    case ERROR:
      return { ...state, error: payload.error };
    default:
      return state;
  }
};

const updateCount = ({ state, payload, type }) => {
  return {
    ...state,
    videos: state.videos.map((_video) =>
      _video._id === payload._id
        ? {
            ..._video,
            statistics: {
              ..._video.statistics,
              [type]: _video.statistics[type] + payload.count,
            },
          }
        : _video
    ),
    currentVideo: {
      ...state.currentVideo,
      statistics: {
        ...state.currentVideo.statistics,
        [type]: state.currentVideo.statistics[type] + payload.count,
      },
    },
  };
};
