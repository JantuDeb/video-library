export const ADD_TO_HISTORY = "ADD_TO_HISTORY";
export const REMOVE_FROM_HISTORY = "REMOVE_FROM_LIKE";
export const GET_HISTORY_VIDEOS = "GET_LIKED_VIDEOS";
export const DELETE_HISTORY = "DELETE_HISTORY"

export const historyReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_HISTORY_VIDEOS:
      return payload.historyVideos;
    case ADD_TO_HISTORY:
      return [...state, payload];
    case REMOVE_FROM_HISTORY:
      return state.filter((video) => video._id !== payload._id);
      case DELETE_HISTORY:
        return []
    default:
      return state;
  }
};
