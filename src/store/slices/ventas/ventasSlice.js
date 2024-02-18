import { createSlice } from '@reduxjs/toolkit';

export const ventasSlice = createSlice({
		name: 'venta',
		initialState: {
				getVentas: [],
				isLoadingVentas: false,
		},
		reducers: {
				startLoadingVentas: (state, /* action */ ) => {
						state.isLoadingVentas = true;
				},
                setActionVentas: (state, action) =>{
					console.log("ventas con redux ");
                    console.log(action);
					state.getVentas = action.payload.getVentas;
					state.isLoadingVentas = false;
                }
		}
});


export const { startLoadingVentas , setActionVentas } = ventasSlice.actions;