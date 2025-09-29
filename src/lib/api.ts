import { authStore } from '@/src/stores/auth';
import axios from 'axios';

export const api = axios.create( {
    baseURL: 'http://34.227.53.16:3000',
    timeout: 15000,
} );

// simple queue while refresh in flight
let refreshing: Promise<string> | null = null;
const waiters: ( ( t: string ) => void )[] = [];
const notifyAll = ( t: string ) => { while ( waiters.length ) waiters.shift()!( t ); };

api.interceptors.request.use( ( cfg ) =>
{
    const token = authStore.getState().accessToken;
    if ( token ) cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
} );

api.interceptors.response.use(
    ( r ) => r,
    async ( err ) =>
    {
        const { response, config } = err || {};
        if ( !response ) throw err;

        // On 401, try a single refresh, then retry the original request
        if ( response.status === 401 && !config.__isRetryRequest ) {
            if ( !refreshing ) {
                refreshing = authStore.getState().refreshTokens().finally( () =>
                {
                    // reset after we got (or failed to get) a token
                    refreshing = null;
                } );
            }
            return new Promise( ( resolve, reject ) =>
            {
                refreshing!
                    .then( ( newToken ) =>
                    {
                        notifyAll( newToken );
                        config.__isRetryRequest = true;
                        config.headers.Authorization = `Bearer ${newToken}`;
                        resolve( api.request( config ) );
                    } )
                    .catch( reject );
            } );
        }
        throw err;
    }
);