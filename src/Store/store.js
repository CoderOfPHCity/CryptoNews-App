import { configureStore } from '@reduxjs/toolkit';

import { cryptApi } from '../components/API/CryptApi';
import { Newsapi } from '../components/API/Newsapi';

export default configureStore({
  reducer: {
    [cryptApi.reducerPath]: cryptApi.reducer,
    [Newsapi.reducerPath]: Newsapi.reducer,
  },
});