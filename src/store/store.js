import { configureStore } from '@reduxjs/toolkit'
import { authorizedSlice } from './slices/authorized'
import { viajesSlice } from './slices/viajes'

export const store = configureStore({
  reducer: {
    authorized: authorizedSlice.reducer,
    viajes: viajesSlice.reducer,
  },
})
