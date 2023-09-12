import { LiveObject, createClient } from '@liveblocks/client'
import {createRoomContext, ClientSideSuspense} from '@liveblocks/react'
import nodeWebsocket from "ws";
import { Liveblocks} from "@liveblocks/node";
import { ReactNode, useCallback } from 'react';
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager"
import {LiveNode, LiveNodeShapeUnion, LiveblocksPresence, LiveblocksStorageModel} from "../index.node.js"
import {v4 as uuidv4} from 'uuid'



let authorizationCallback: (() => Promise<{
    token: string
}>)

export const liveblocksNodeConfig = <LiveNodeUnion extends LiveNode<any, any>,>() => {
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
    } = createRoomContext<LiveblocksPresence, LiveblocksStorageModel<LiveNodeUnion>>(
        createClient({
            polyfills: {
                WebSocket: nodeWebsocket
            },
            authEndpoint: async () => authorizationCallback?.(),
        })
    )
    const createLiveNode = <T extends LiveNodeShapeUnion<LiveNodeUnion>["type"],>({
        type,
        state,
    }:{
        type: T,
        state: (LiveNodeShapeUnion<LiveNodeUnion>&{type: T})['state'],
    }): LiveNode<T, (LiveNodeShapeUnion<LiveNodeUnion>&{type: T})['state']> => {
        return new LiveObject({
            nodeId: uuidv4(),
            type,
            state: new LiveObject({
                ...state,
            }),
        })
    }
    const useMutationCreateNode = () => useMutation((
        {storage}, 
        {type, state}: Parameters<typeof createLiveNode>[0]
    ) => {
        const node = createLiveNode({type, state})
        const nodeId = node.get('nodeId')
        storage.get('nodeMap').set(nodeId, node as any)
    }, [])


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
        createLiveNode,
        useMutationCreateNode,
        LiveblocksNodeRoomProvider
    }
}





