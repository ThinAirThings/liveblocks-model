import { Room } from "@liveblocks/client"
import { LiveIndexNode, LiveIndexStorageModel } from "./LiveIndexNode.js"
import { GenericCustomNodeTemplate } from "./CustomNodeTemplate.js"
import { UixNode } from "./UixNode.js"




export class S3ObjectNode <
    ParentUixNode extends UixNode | null,
    NodeTemplate extends GenericCustomNodeTemplate
> implements UixNode<ParentUixNode, NodeTemplate>{
    // Index Node Accesses
    liveIndexNode: LiveIndexNode
    get nodeId(){ return this.liveIndexNode.get('nodeId')}
    get type(){ return this.liveIndexNode.get('type') as NodeTemplate['type']}
    get subtype(){ return this.liveIndexNode.get('subtype') as NodeTemplate['subtype']}
    get metadata(){ return this.liveIndexNode.get('metadata') as NodeTemplate['metadata']}
    // UixNode Objects
    childNodeTypeSets: UixNode<ParentUixNode, NodeTemplate>['childNodeTypeSets']
    constructor(
        private liveIndexRoom: Room<{}, LiveIndexStorageModel, any, any>,
        private liveNodeIndex: LiveIndexStorageModel['liveNodeIndex'],
        public parentNode: ParentUixNode,
        nodeId: string,
        public nodeTemplate: NodeTemplate,
    ){
        this.liveIndexNode = liveNodeIndex.get(nodeId)!
        this.childNodeTypeSets = nodeTemplate.childCustomNodeTemplateRecord ? 
            Object.fromEntries(
                Object.keys(nodeTemplate.childCustomNodeTemplateRecord)
                    .map((type) => [type, new Set(
                        [...this.liveIndexNode.get('childNodeIds').keys()]
                        .filter((childNodeId) => this.liveNodeIndex.get(childNodeId)!.get('type') === type)
                        .map((childNodeId) => new SimpleStateNode(
                            liveIndexRoom, liveNodeIndex, this, childNodeId, nodeTemplate.childCustomNodeTemplateRecord![type]
                        ))
    }
}