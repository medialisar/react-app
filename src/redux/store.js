import { configureStore } from '@reduxjs/toolkit';
import SpotifyReducer from './slice';

export default configureStore({
  reducer: {
    spotify: SpotifyReducer,
  },
});
