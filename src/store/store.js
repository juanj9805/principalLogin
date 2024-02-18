import { configureStore } from '@reduxjs/toolkit'
import { authorizedSlice } from './slices/authorized'
import { viajesSlice } from './slices/viajes'
import { roleSlice } from './slices/roleSlice'

export const store = configureStore({
  reducer: {
    authorized: authorizedSlice.reducer,
    viajes: viajesSlice.reducer,
    roles: roleSlice.reducer,
  },
})
