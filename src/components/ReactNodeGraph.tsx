import React from 'react';
import {ReactNodeGraph as NodeGraph} from 'react-node-graph'
import './ReactNodeGraph.css';


function ReactNodeGraph() {

  var exampleGraph = {
    "nodes":[
      {"nid":0,"type":"Timer","x":89,"y":82,"fields":{"in":[{"name":"reset"},{"name":"pause"},{"name":"max"}],"out":[{"name":"out"}]}},
      {"nid":1,"type":"MathMult","x":284,"y":82,"fields":{"in":[{"name":"in"},{"name":"factor"}],"out":[{"name":"out"}]}},
      {"nid":2,"type":"Vector3","x":486,"y":188,"fields":{"in":[{"name":"xyz"},{"name":"x"},{"name":"y"},{"name":"z"}],"out":[{"name":"xyz"},{"name":"x"},{"name":"y"},{"name":"z"}]}}
    ],
    "connections":[
      {"from_node":0,"from":"field_name","to_node":1,"to":"field_name"},
    ]
  };

  const onNodeMove = (nid: any, pos: any) => {
    console.log('nid', nid)
    console.log('pos', pos)
  }

  const onNodeStartMove = (nid: any) => {
    console.log('nid', nid)
  }

  const onNewConnector = (n1: any, o: any, n2: any, i: any) => {
    console.log('n1', n1)
    console.log('o', o)
    console.log('n2', n2)
    console.log('i', i)
  }

  const onRemoveConnector = (connector: any) => {
    console.log('connector', connector)
  }

  return (
    <div className="ReactNodeGraph">
      <NodeGraph
        data={exampleGraph}
        onNodeMove={onNodeMove}
        onNodeStartMove={onNodeStartMove}
        onNewConnector={onNewConnector}
        onRemoveConnector={onRemoveConnector}
      />
    </div>
  );
}

export default ReactNodeGraph;
