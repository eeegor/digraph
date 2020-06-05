import React, {useState, useRef } from 'react'
import {
  GraphView, INode, IEdge
} from 'react-digraph';
import './ReactDigraph.css'
import {v4 as uuid} from 'uuid'

const sample = {
  "nodes": [
    {
      "id": '1',
      "title": "Node 1",
      "subtitle": "Node 1 a",
      "x": 258.3976135253906,
      "y": 331.9783248901367,
      "type": "empty"
    },
    {
      "id": '2',
      "title": "Node 2",
      "x": 593.9393920898438,
      "y": 260.6060791015625,
      "type": "empty"
    },
    {
      "id": '3',
      "title": "Node 3",
      "x": 237.5757598876953,
      "y": 61.81818389892578,
      "type": "empty"
    },
    {
      "id": '4',
      "title": "Node 4",
      "x": 600.5757598876953,
      "y": 600.81818389892578,
      "type": "empty"
    }
  ],
  "edges": [
    {
      "source": 1,
      "target": 2,
      "type": "emptyEdge"
    },
    {
      "source": 2,
      "target": 4,
      "type": "emptyEdge"
    }
  ]
}

const GraphConfig =  {
  NodeTypes: {
    empty: { // required to show empty nodes
      typeText: "Message",
      shapeId: "#empty", // relates to the type property of a node
      shape: (
        <symbol viewBox="0 0 100 50" id="empty" key="0">
          <rect width="100" height="50"></rect>
        </symbol>
      )
    },
  },
  NodeSubtypes: {},
  EdgeTypes: {
    emptyEdge: {  // required to show empty edges
      title: "Message",
      shapeId: "#emptyEdge",
      shape: (
        <symbol viewBox="0 0 50 50" id="emptyEdge" key="0">
          <circle cx="25" cy="25" r="8" fill="currentColor"> </circle>
        </symbol>
      )
    }
  }
}

const NODE_KEY = "id"       // Allows D3 to correctly update DOM

const ReactDigraph = () => {
  const ref = useRef(null)
  const [nodes, setNodes] = useState(sample.nodes)
  const [edges, setEdges] = useState(sample.edges)
  const [selected, setSelected] = useState<any>(null)
  /* Define custom graph editing methods here */

  const onSelectNode = (node: any) => {
    console.log('onSelectNode', node)
    setSelected(node)
  }
  const onCreateNode = (x: number, y: number, event: any) => {
    console.log('onCreateNode', x, y, event)
    const newNode = {
      id: uuid(),
      title: '',
      type: "empty",
      x,
      y,
    }
    setNodes([
      ...nodes,
      newNode
    ])
    onSelectNode(newNode)
  }
  const onUpdateNode = (node: any) => {
    console.log('onUpdateNode', node)
    setNodes(nodes.map(n => n.id === node.id ? node : n))
  }
  const onDeleteNode = (selected: any, nodeId: string, nodes: any[]) => {
    console.log('onDeleteNode', selected, nodeId, nodes)
    setNodes(nodes.filter(n => n.id !== nodeId))
  }
  const onSelectEdge = (edge: any) => {
    console.log('onSelectEdge', edge)
    setSelected(edge)
  }
  const onCreateEdge = (sourceNode: INode, targetNode: INode) => {
    console.log('onCreateEdge', sourceNode, targetNode)
    setEdges([
      ...edges,
      {
        source: sourceNode.id,
        target: targetNode.id,
        type: "emptyEdge"
      }
    ])
  }
  const onSwapEdge = (sourceNode: INode, targetNode: INode, edge: IEdge) => {
    console.log('onSwapEdge', sourceNode, targetNode, edge)
    const cleanEdges = edges.filter(e => JSON.stringify(e) !==  JSON.stringify(edge))
    setEdges([...cleanEdges, {
      source: sourceNode.id,
      target: targetNode.id,
      type: "emptyEdge"
    }])
  }
  const onDeleteEdge = (selectedEdge: IEdge) => {
    console.log('onDeleteEdge', selectedEdge, edges)
    setEdges(edges.filter(e => JSON.stringify(e) !== JSON.stringify(selectedEdge)))
  }

  const handleChangeTitle = (event: any) => {
    setSelected({
      ...selected,
      title: event.target.value,
    })
  }

  const handleSaveTitle = () => {
    if (selected) {
      setNodes(nodes.map(n => n.id === selected.id ? selected : n))
    }
  }

  const NodeTypes = GraphConfig.NodeTypes;
  const NodeSubtypes = GraphConfig.NodeSubtypes;
  const EdgeTypes = GraphConfig.EdgeTypes;

  return (
    <div className="graph">
      {selected && (
        <div className="edit">
          <input type="text" value={selected.title} onChange={handleChangeTitle} />
          <button onClick={handleSaveTitle}>Save</button>
        </div>
      )}
      <GraphView
        ref={ref}
        nodeKey={NODE_KEY}
        nodes={nodes}
        edges={edges}
        selected={selected}
        nodeTypes={NodeTypes}
        nodeSubtypes={NodeSubtypes}
        edgeTypes={EdgeTypes}
        onSelectNode={onSelectNode}
        onCreateNode={onCreateNode}
        onUpdateNode={onUpdateNode}
        onDeleteNode={onDeleteNode}
        onSelectEdge={onSelectEdge}
        onCreateEdge={onCreateEdge}
        onSwapEdge={onSwapEdge}
        onDeleteEdge={onDeleteEdge}
      />
    </div>
  );
}

export default ReactDigraph
