import { useState } from 'react';
import './App.css';
import Graph from 'react-graph-vis';
import InputComponent from './components/InputComponent';
import BaseButton from './components/BaseButton';

function App() {
  const [readText, setReadText] = useState<string | ArrayBuffer | null>(null);
  const [graph, setGraph] = useState({
    nodes: [
      { id: 1, label: 'Node 1', title: 'node 1 tootip text' },
      { id: 2, label: 'Node 2', title: 'node 2 tootip text' },
      { id: 3, label: 'Node 3', title: 'node 3 tootip text' },
      { id: 4, label: 'Node 4', title: 'node 4 tootip text' },
      { id: 5, label: 'Node 5', title: 'node 5 tootip text' },
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
    ],
  });

  const options = {
    layout: {
      hierarchical: true,
    },
    edges: {
      color: '#000000',
    },
    height: '500px',
  };

  const events = {
    select: function (event: any) {
      const { nodes, edges } = event;
      //dummy filtering nodes
      let bar = {
        nodes: graph.nodes.filter((node) => node.id !== nodes?.[0]),
        edges: [...graph.edges],
      };
      console.log('nodes', nodes, '\n', 'edges', event, '\n', bar);
      return setGraph((prev) => bar);
    },
  };

  return (
    <div className='p-4 flex-none flex-row justify-center items-center justify-items-center'>
      {/* <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p> */}
      <div className='flex self-center'>
        <BaseButton
          text={'Input text'}
          onClick={() => console.log('Input text')}
        />
        <BaseButton
          text={'Load text'}
          onClick={() => console.log('Load text')}
        />
        <BaseButton
          text={'Save graph'}
          onClick={() => console.log('Save graph')}
        />
      </div>
      <div className='flex self-center'>
        <InputComponent inputState={readText} setInputState={setReadText} />
      </div>
      <div className='flex self-center'>
        <Graph
          graph={graph}
          options={options}
          events={events}
          getNetwork={(network: any) => {
            console.log(network);
            //  if you want access to vis.js network api you can set the state in a parent component using this property
          }}
        />
      </div>
    </div>
  );
}

export default App;
