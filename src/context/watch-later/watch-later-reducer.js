export const ADD_TO_WATCH_LATER = "ADD_TO_WATCH_LATER";
export const REMOVE_FROM_WATCH_LATER = "REMOVE_FROM_LIKE";
export const GET_WATCH_LATER_VIDEOS = "GET_LIKED_VIDEOS";

export const watchLaterReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_WATCH_LATER_VIDEOS:
      return [...state, ...payload];
    case ADD_TO_WATCH_LATER:
      return [...state, payload];
    case REMOVE_FROM_WATCH_LATER:
      return state.filter((video) => video._id !== payload._id);
    default:
      return state;
  }
};
