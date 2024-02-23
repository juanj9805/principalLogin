import axios from 'axios'
export const usuariosApi = axios.create({    baseURL: 'https://localhost:7211/api/Usuarios'})