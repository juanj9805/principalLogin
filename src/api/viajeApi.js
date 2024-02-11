import axios from 'axios'

export const viajeApi = axios.create({    baseURL: 'https://localhost:7211/api/Paquete'})