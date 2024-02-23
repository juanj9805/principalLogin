import { createSlice } from '@reduxjs/toolkit';

export const usuariosSlice = createSlice({
		name: 'usuario',
		initialState: {
				getUsuarios: [],
				isLoadingUsuarios: false,
		},
		reducers: {
				startLoadingUsuarios: (state, /* action */ ) => {
						state.isLoadingUsuarios = true;
				},
                setActionUsuarios: (state, action) =>{
					console.log("ventas con redux ");
                    console.log(action);
					state.getUsuarios = action.payload.getUsuarios;
					state.isLoadingUsuarios = false;
                }
		}
});


export const { startLoadingUsuarios , setActionUsuarios } = usuariosSlice.actions;