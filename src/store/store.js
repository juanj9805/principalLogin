import { configureStore } from '@reduxjs/toolkit'
import { authorizedSlice } from './slices/authorized'

export const store = configureStore({
  reducer: {
    authorized: authorizedSlice.reducer,
  },
})
