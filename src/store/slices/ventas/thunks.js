import { startLoadingVentas , setActionVentas  } from "./ventasSlice.js";
import {ventasApi} from "../../../api/ventasApi.js";

export const getVentasThunks = (  ) => {

    return async ( dispatch , getState ) => {

                dispatch ( startLoadingVentas() ); 

                // TODO: realizar petición http
                // const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${ page * 10 }`)

                // const data = await resp.json();

                // console.log(data);

                const { data } = await ventasApi.get(`/ObtenerVentas`);

        /*         console.log("juan estamos en thunks");

                console.log( data ); */
                
                dispatch ( setActionVentas( { getVentas: data } ) ); 
    }
}