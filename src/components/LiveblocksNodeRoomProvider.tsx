import { LiveMap, createClient } from '@liveblocks/client'
import {createRoomContext, ClientSideSuspense} from '@liveblocks/react'
import nodeWebsocket from "ws";
import { authorize } from "@liveblocks/node";
import { ReactNode, Suspense, useCallback } from 'react';
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager"
import {LiveblocksPresence, LiveblocksStorageModel} from "../index.js"


const secretsClient = new SecretsManagerClient({region: "us-east-1"});
export const {
    suspense: {
        useLostConnectionListener,
        useStatus,
        useErrorListener,
        useRoom,
        useMyPresence,
        useUpdateMyPresence,
        useOthersMapped,
        useOthers,
        useStorage,
        RoomProvider,
        useMutation,
        useSelf,
        RoomContext
    }
} = createRoomContext<LiveblocksPresence, LiveblocksStorageModel>(createClient({
    polyfills: {
        WebSocket: nodeWebsocket
    },
    authEndpoint: async () => authorizationCallback?.(),
}))

let authorizationCallback: (() => Promise<{
    token: string
}>)

export const LiveblocksNodeRoomProvider = ({
    userId,
    spaceId,
    serverName,
    Children
}: {
    userId: string
    spaceId: string
    serverName: string
    Children: () => ReactNode
}) => {
    authorizationCallback = useCallback( async () => {
        const response =  JSON.parse((await authorize({
            room: spaceId,
            userId: userId,
            // secret: process.env.LIVEBLOCKS_API_KEY!
            secret: (await secretsClient.send(new GetSecretValueCommand({
                SecretId: "LiveblocksToken-dev"
            }))).SecretString!
        })).body) as {
            token: string
        }
        console.log(response)
        return response
    }, [])
    return (
       <RoomProvider
            id={spaceId}
            initialPresence={{
                displayName: `${serverName}`,
                absoluteCursorState: null,
                viewportState: {x: 0, y: 0, scale: 1},
                mouseSelectionState: {
                    selectionActive: false,
                    absoluteSelectionBounds: null,
                },
                selectedNodeIds: [],
                focusedNodeId: null,
            }}
            shouldInitiallyConnect={true}
        >
            <ClientSideSuspense fallback={<></>}>
                {() => <Children/>}
            </ClientSideSuspense>
        </RoomProvider>
    )
}



