import { JsonObject, createClient } from '@liveblocks/client'
import {AirNodeIndex, AirNodeUnion, LiveAirNode, LiveblocksStorageModel} from '../../model/data-model.js'
import { ClientSideSuspense, createRoomContext } from '@liveblocks/react'
import nodeWebsocket from "ws"; 
import { ReactNode, useCallback } from 'react';
import { Liveblocks} from "@liveblocks/node";
import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import { customLiveHooksFactory } from "../shared/customLiveHooksFactory.js"

let authorizationCallback: (() => Promise<{
    token: string
}>)

export const liveblocksNodeConfig = <
    Index extends AirNodeIndex<any>,
    U extends AirNodeUnion<Index>,
    LiveblocksStorage extends LiveblocksStorageModel<LiveAirNode<U>>,
    LiveblocksPresence extends JsonObject={},
>(
    NodeIndex: Index,
    createClientProps: Parameters<typeof createClient>[0],
    initialLiveblocksPresence: LiveblocksPresence,
    initialLiveblocksStorage: LiveblocksStorage,
) => {
    const liveblocks = createRoomContext<
        LiveblocksPresence, 
        LiveblocksStorage
    >(
        createClient({
            polyfills: {
                WebSocket: nodeWebsocket
            },
            authEndpoint: async () => authorizationCallback?.(),
        })
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
            <liveblocks.RoomProvider
                id={spaceId}
                initialPresence={initialLiveblocksPresence}
                shouldInitiallyConnect={true}
            >
                <ClientSideSuspense fallback={<></>}>
                    {children}
                </ClientSideSuspense>
            </liveblocks.RoomProvider>
        )
    }
    return {
        ...liveblocks,
        ...customLiveHooksFactory(
            NodeIndex,
            liveblocks.useStorage,
            liveblocks.useMutation,
        ),
        LiveblocksNodeRoomProvider
    }
}




