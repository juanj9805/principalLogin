import { startLoadingUsuarios , setActionUsuarios  } from "./usuariosSlice.js";
import { usuariosApi } from "../../../api/usuariosApi.js";

export const getUsuariosThunks = (  ) => {

    return async ( dispatch , getState ) => {

                dispatch ( startLoadingUsuarios() ); 

                // TODO: realizar petición http
                // const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${ page * 10 }`)

                // const data = await resp.json();

                // console.log(data);

                const { data } = await usuariosApi.get(`/VerUsuario`);

        /*         console.log("juan estamos en thunks");

                console.log( data ); */
                
                dispatch ( setActionUsuarios( { getUsuarios: data } ) ); 
    }
}