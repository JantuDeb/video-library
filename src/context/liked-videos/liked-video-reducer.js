export const ADD_TO_LIKE = "ADD_TO_LIKE";
export const REMOVE_FROM_LIKE = "REMOVE_FROM_LIKE";
export const GET_LIKED_VIDEOS = "GET_LIKED_VIDEOS";

export const likedVideoReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LIKED_VIDEOS:
      return payload.likedVideos;
    case ADD_TO_LIKE:
      return [...state, payload];
    case REMOVE_FROM_LIKE:
      return state.filter((video) => video._id !== payload._id);
    default:
      return state;
  }
};
