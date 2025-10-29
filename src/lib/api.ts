import axios, { AxiosHeaders } from "axios";

export const api = axios.create( {
    baseURL: "http://34.227.53.16:3000/",
    timeout: 15_000,
} );


// Log all requests in dev mode
if ( __DEV__ ) {
    api.interceptors.request.use( ( config ) =>
    {
        console.log( `[${config.method?.toUpperCase()}] ${config.baseURL}${config.url}` );
        return config;
    } );
}

export const withAuth = ( token?: string ) =>
{
    const inst = api.create();
    inst.interceptors.request.use( ( config ) =>
    {
        if ( token ) {
            config.headers = config.headers ?? new AxiosHeaders();
            ( config.headers as AxiosHeaders ).set( "Authorization", `Bearer ${token}` );
        }
        return config;
    } );
    return inst;
};