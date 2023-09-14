// src/environments/shared/createLiveAirNodeFactory.ts
import { LiveObject } from "@liveblocks/client";
import { v4 as uuidv4 } from "uuid";
var createLiveAirNodeFactory = () => ({
  type,
  state,
  meta
}) => {
  return new LiveObject({
    nodeId: uuidv4(),
    type,
    meta,
    state: new LiveObject({
      ...state
    })
  });
};

// src/environments/shared/mutations/useMutationCreateNodeFactory.ts
var useMutationCreateNodeFactory = (useMutation, createLiveAirNode) => () => useMutation(({ storage }, { type, meta, state }) => {
  const node = createLiveAirNode({ type, meta, state });
  const nodeId = node.get("nodeId");
  storage.get("nodeMap").set(nodeId, node);
  return nodeId;
}, []);

// src/environments/shared/mutations/useMutationDeleteNodeFactory.ts
var useMutationDeleteNodeFactory = (useMutation) => () => useMutation(({ storage }, nodeId) => {
  storage.get("nodeMap").delete(nodeId);
}, []);

// src/environments/shared/mutations/useMutationUpdateNodeFactory.ts
var useMutationUpdateNodeFactory = (useMutation) => (key) => useMutation(({ storage }, nodeId, value) => {
  const node = storage.get("nodeMap").get(nodeId);
  const state = node.get("state");
  const oldValue = state.get(key);
  node.get("state").set(key, {
    ...oldValue,
    ...value
  });
}, []);

// src/environments/shared/storage/useStorageGetNodeFactory.ts
import isEqual from "lodash.isequal";
var useStorageGetNodeFactory = (useStorage) => (nodeId, key) => useStorage((root) => {
  return root.nodeMap.get(nodeId).state[key];
}, (a, b) => isEqual(a, b));

// src/environments/shared/storage/useStorageGetNodeMap.ts
var useStorageGetNodeMapFactory = (useStorage) => () => useStorage((root) => {
  return root.nodeMap;
});

// src/environments/shared/storage/useStorageGetMetaFactory.ts
var useStorageGetMetaFactory = (useStorage) => () => useStorage((root) => root.meta);

// src/environments/shared/mutations/useMutationUpdateMetaFactory.ts
var useMutationUpdateMetaFactory = (useMutation) => () => useMutation(({ storage }, updater) => {
  updater(storage.get("meta"));
}, []);

// src/environments/shared/customLiveHooksFactory.ts
var customLiveHooksFactory = (useStorage, useMutation, createLiveAirNode) => {
  return {
    // Meta
    useStorageGetMeta: useStorageGetMetaFactory(useStorage),
    useMutationUpdateMeta: useMutationUpdateMetaFactory(useMutation),
    // Nodes
    useStorageGetNodeMap: useStorageGetNodeMapFactory(useStorage),
    useStorageGetNode: useStorageGetNodeFactory(useStorage),
    useMutationCreateNode: useMutationCreateNodeFactory(
      useMutation,
      createLiveAirNode
    ),
    useMutationUpdateNode: useMutationUpdateNodeFactory(useMutation),
    useMutationDeleteNode: useMutationDeleteNodeFactory(useMutation)
  };
};

export {
  createLiveAirNodeFactory,
  customLiveHooksFactory
};
