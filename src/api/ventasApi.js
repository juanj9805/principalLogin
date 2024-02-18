import axios from 'axios'

export const ventasApi = axios.create({    baseURL: 'https://localhost:7211/api/Sale'})