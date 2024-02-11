import { startLoadingViajes , setActionViajes  } from "./viajesSlice";
import {viajeApi} from "../../../api/viajeApi.js";

export const getViajesThunks = (  ) => {

    return async ( dispatch , getState ) => {

                dispatch ( startLoadingViajes() ); 

                // TODO: realizar petición http
                // const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${ page * 10 }`)

                // const data = await resp.json();

                // console.log(data);

                const { data } = await viajeApi.get(`/ObtenerPaquetes`);

        /*         console.log("juan estamos en thunks");

                console.log( data ); */
                
                dispatch ( setActionViajes( { getViajes: data } ) ); 
    }
}