// import { SimpleStateNode } from "./SimpleStateNode.js"
import { createSimpleStateNodeTemplate } from "./SimpleStateNode/createSimpleStateNodeTemplate.js"
import { createS3ObjectNodeTemplate } from "./S3ObjectNode/createS3ObjectNodeTemplate.js"
import { RootNode } from "./RootNode/RootNode.js"
import { createRootNodeTemplate } from "./RootNode/createRootNodeTemplate.js"


export const Level1NodeATemplate = () => createSimpleStateNodeTemplate(
    'Level1NodeA', {}, {
        numberType: <number> 5
    }, {
        "Level2NodeA": Level2NodeATemplate(),
        "Level2NodeB": Level2NodeBTemplate(),
    }
)
export const Level2NodeATemplate = () =>  createSimpleStateNodeTemplate(
    "Level2NodeA", {}, {
        stringType: <string> 'New Job'
    }, {        
        "Level3From2ANodeA": Level3From2ANodeATemplate(),
        "Level3From2ANodeB": Level3From2ANodeBTemplate(),
    }    
)
export const Level2NodeBTemplate = () =>  createSimpleStateNodeTemplate(
    "Level2NodeB", {}, {
        objectType: {
            a: <string> 'a',
        }
    }    
)

export const Level3From2ANodeATemplate = () => createS3ObjectNodeTemplate(
    'Level3From2ANodeA', {},
    'Bucket Name'
)

export const Level3From2ANodeBTemplate = () => createS3ObjectNodeTemplate(
    'Level3From2ANodeB', {
        metadata: {}
    }
)


const rootNode = new RootNode(
    null as any,
    null as any,
    createRootNodeTemplate({
        "Level1NodeA": Level1NodeATemplate(),
    })
) 
const Level1NodeA = rootNode.createChild('Level1NodeA')
Level1NodeA.createChild('')
const level2NodeA = Level1NodeA.createChild('Level2NodeA')
level2NodeA.createChild('')
level2NodeA.useStorage('')
const level2NodeB = Level1NodeA.createChild('Level2NodeB')
level2NodeB.useStorage('objectType')
const level3From2ANodeA = level2NodeA.createChild('Level3From2ANodeA')
const level3From2ANodeB = level2NodeA.createChild('Level3From2ANodeB')
level3From2ANodeB.parentNode.parentNode.parentNode.createChild('Level1NodeA')

// const rootNode = createUixNode(
//     null,
//     businessTemplate
// )

// const jobNode = rootNode.createChild('JobNode')
// const contactNode = jobNode.createChild('ContactNode')
// contactNode.parentNode['state']['jobName']
// contactNode.state['contactName']
// contactNode.createChild('ProfilePictureNode')
// jobNode.state['jobName']
