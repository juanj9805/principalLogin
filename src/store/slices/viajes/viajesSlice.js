import { createSlice } from '@reduxjs/toolkit';

export const viajesSlice = createSlice({
		name: 'viaje',
		initialState: {
				getViajes: [],
				isLoading: false,
		},
		reducers: {
				startLoadingViajes: (state, /* action */ ) => {
						state.isLoading = true;
				},
                setActionViajes: (state, action) =>{
					console.log("viajes con redux ");
                    console.log(action);
					state.getViajes = action.payload.getViajes;
					state.isLoading = false;
                }
		}
});


export const { startLoadingViajes , setActionViajes } = viajesSlice.actions;