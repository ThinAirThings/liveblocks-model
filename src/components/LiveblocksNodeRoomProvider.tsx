import { LiveMap, createClient } from '@liveblocks/client'
import {createRoomContext, ClientSideSuspense} from '@liveblocks/react'
import nodeWebsocket from "ws";
import { Liveblocks, authorize } from "@liveblocks/node";
import { ReactNode, Suspense, useCallback } from 'react';
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager"
import {LiveblocksPresence, LiveblocksStorageModel} from "../index.js"

export const {
    // suspense: {
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
    // }
} = createRoomContext<LiveblocksPresence, LiveblocksStorageModel>(
        createClient({
            polyfills: {
                WebSocket: nodeWebsocket
            },
            authEndpoint: async () => authorizationCallback?.(),
        })
    )

let authorizationCallback: (() => Promise<{
    token: string
}>)

export const LiveblocksNodeRoomProvider = ({
    userId,
    spaceId,
    serverName,
    children
}: {
    userId: string
    spaceId: string
    serverName: string
    children: () => ReactNode
}) => {
    authorizationCallback = useCallback( async () => {
        const liveblocksClient = new Liveblocks({
            secret: (
                await new SecretsManagerClient({region: "us-east-1"})
                    .send(new GetSecretValueCommand({
                        SecretId: "LiveblocksToken-dev"
                    }))
            ).SecretString!
        })
        const {body} = await liveblocksClient.prepareSession(userId)
            .allow(spaceId, ["room:write", "comments:write"])
            .authorize()
        return JSON.parse(body) as {
            token: string
        }
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
                {children}
            </ClientSideSuspense>
        </RoomProvider>
    )
}



