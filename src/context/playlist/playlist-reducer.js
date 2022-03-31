export const ADD_TO_PLAYLIST = "ADD_TO_PLAYLIST";
export const REMOVE_FROM_PLAYLIST = "REMOVE_FROM_PLAYLIST";
export const CREATE_PLAYLIST = "CREATE_PLAYLIST";
export const DELETE_PLAYLIST = "DELETE_PLAYLIST";
export const UPDATE_PLAYLIST = "UPDATE_PLAYLIST";
export const GET_PLAYLISTS = "GET_PLAYLISTS";

export const playlistReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PLAYLISTS:
      return [...state, ...payload];
    case CREATE_PLAYLIST:
      return [...state, payload];
    case UPDATE_PLAYLIST:
      return state.map((playlist) =>
        playlist._id === payload._id ? { ...playlist, ...payload } : playlist
      );

    case ADD_TO_PLAYLIST:
      return state.map((playlist) =>
        playlist._id === payload._id
          ? { ...playlist, videos: payload.videos }
          : playlist
      );
    case REMOVE_FROM_PLAYLIST:
      return state.map((playlist) =>
        playlist._id === payload.playlist._id
          ? {
              ...playlist,
              videos: playlist.videos.filter(
                (video) => video._id !== payload.videoId
              ),
            }
          : playlist
      );
    case DELETE_PLAYLIST:
      return state.filter((playlist) => playlist._id !== payload._id);
    default:
      return state;
  }
};
