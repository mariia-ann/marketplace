import axios, { CanceledError, isCancel } from "axios";
import { useAuthStore } from "@/src/state/useAuthStore";

declare module "axios" {
    export interface AxiosRequestConfig
    {
        skipAuth?: boolean;
        requireAuth?: boolean;
    }
}

export const api = axios.create( {
    baseURL: "http://34.227.53.16:3000/",
    timeout: 15_000,
} );

// REQUEST INTERCEPTOR
api.interceptors.request.use( ( config ) =>
{
    const token = useAuthStore.getState().token;

    // 1) Hard opt-out (e.g., login/register)
    if ( config.skipAuth ) return config;

    // 2) Optional auth: attach if we have it
    if ( token ) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    } else if ( config.requireAuth ) {
        // 3) Hard opt-in: this call MUST have auth → abort early
        const err = new CanceledError( "AUTH_REQUIRED" );
        // You can also throw a custom error object if you prefer
        throw err;
    }
    // TODO /by Demidas/ Delete before deploy below is for log purpose only
    if ( __DEV__ ) {
        console.log(
            `[${config.method?.toUpperCase()}] ${config.baseURL}${config.url} ` +
            ( config.skipAuth ? "(skipAuth)" : config.requireAuth ? "(requireAuth)" : token ? "(with token)" : "(guest)" )
        );
    }
    return config;
} );

// RESPONSE INTERCEPTOR (optional QoL)
api.interceptors.response.use(
    ( res ) => res,
    ( error ) =>
    {
        // Swallow our deliberate cancel cleanly
        if ( isCancel( error ) && error.message === "AUTH_REQUIRED" ) {
            // Optionally signal UI: show login modal/toast
            return Promise.reject( { code: "AUTH_REQUIRED" } );
        }

        // Central 401 handling for calls that attempted auth but failed (expired token)
        if ( error?.response?.status === 401 ) {
        // You can softly sign out or trigger a refresh flow here
        // useAuthStore.getState().signOut();
        }
        return Promise.reject( error );
    }
);