import { AppState } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { focusManager, onlineManager } from "@tanstack/react-query";

export function setupReactQueryRN ()
{
    focusManager.setEventListener( ( handleFocus ) =>
    {
        const sub = AppState.addEventListener( "change", ( state ) =>
        {
            handleFocus( state === "active" );
        } );
        return () => sub.remove();
    } );

    // Connectivity
    onlineManager.setEventListener( ( setOnline ) =>
    {
        return NetInfo.addEventListener( ( state ) =>
        {
            setOnline( Boolean( state.isConnected ) );
        } );
    } );
}