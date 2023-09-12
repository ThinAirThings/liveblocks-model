import { Lson, createClient } from '@liveblocks/client'
import {createRoomContext, ClientSideSuspense} from '@liveblocks/react'
import nodeWebsocket from "ws";
import { Liveblocks} from "@liveblocks/node";
import { ReactNode, useCallback } from 'react';
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager"
import { LiveAirNode, LiveblocksPresence, LiveblocksStorageModel } from '../../index.node.js';
import { createLiveAirNodeFactory } from '../shared/createLiveAirNodeFactory.js';
import { customLiveHooksFactory } from '../shared/customLiveHooksFactory.js';

let authorizationCallback: (() => Promise<{
    token: string
}>)

export const liveblocksNodeConfig = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
>() => {
    const {
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
    } = createRoomContext<LiveblocksPresence, LiveblocksStorageModel<LiveAirNodeUnion, Meta>>(
        createClient({
            polyfills: {
                WebSocket: nodeWebsocket
            },
            authEndpoint: async () => authorizationCallback?.(),
        })
    )
    const createLiveAirNode = createLiveAirNodeFactory<LiveAirNodeUnion>()
    const {
        useStorageGetMeta,
        useStorageGetNodeMap,
        useStorageGetNode,
        useMutationCreateNode,
        useMutationUpdateNode,
        useMutationDeleteNode,
    } = customLiveHooksFactory(
        useStorage,
        useMutation,
        createLiveAirNode,
    )

    const LiveblocksNodeRoomProvider = ({
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
    return {
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
        RoomContext,
        createLiveAirNode,
        useStorageGetMeta,
        useStorageGetNodeMap,
        useStorageGetNode,
        useMutationCreateNode,
        useMutationUpdateNode,
        useMutationDeleteNode,
        LiveblocksNodeRoomProvider
    }
}




