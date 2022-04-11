import { useState, useEffect } from 'react';
import './App.css';
import Graph from 'react-graph-vis';
import InputComponent from './components/InputComponent';
import BaseButton from './components/BaseButton';
import RightTab from './components/RightTab';
import { GlobalGraphSettings, GraphType } from './types';
import { GraphContext } from './contexts/GraphContext';
import { GlobalGraphSettingsContext } from './contexts/SettingsContext';
import { v4 as uuid } from 'uuid';

function App() {
  const [readText, setReadText] = useState<string | ArrayBuffer | null>(null);
  const [graphId, setGraphId] = useState<string>(uuid())
  const [graph, setGraph] = useState<GraphType>({
    nodes: [
      { id: 1, label: 'Node 1', title: 'node 1 tootip text', count: 1 },
      { id: 2, label: 'Node 2', title: 'node 2 tootip text', count: 3  },
      { id: 3, label: 'Node 3', title: 'node 3 tootip text', count: 5  },
      { id: 4, label: 'Node 4', title: 'node 4 tootip text', count: 7  },
      { id: 5, label: 'Node 5', title: 'node 5 tootip text', count: 9  },
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
    ],
  });

  const [filteredGraph, setFilteredGraph] = useState<GraphType>(graph)

  const [globalSettings, setGlobalSettings] = useState<GlobalGraphSettings>({
    minCountThreshold: 3,
    maxCountThreshold: 5,
  })

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
    
  };

  useEffect(() => {
    setFilteredGraph({
      ...graph,
      nodes: graph.nodes.filter((node) => {
        return node.count >= globalSettings.minCountThreshold &&
          node.count <= globalSettings.maxCountThreshold;
      }),
    });
    setGraphId(uuid())
  }, [graph, globalSettings]);

  return (
    <GraphContext.Provider value={graph}>
      <GlobalGraphSettingsContext.Provider value={{
        settings: globalSettings,
        updateSettings: setGlobalSettings,
      }}>
        <div className="flex justify-center justify-items-center">
          <div className='p-4 flex-none flex-row justify-center items-center justify-items-center w-3/4 m-0'>
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
                key={graphId}
                graph={filteredGraph}
                options={options}
                events={events}
                getNetwork={(network: any) => {
                  console.log(network);
                  //  if you want access to vis.js network api you can set the state in a parent component using this property
                }}
              />
            </div>
          </div>
          <div className='p-4'>
            <RightTab/>
          </div>
        </div>
      </GlobalGraphSettingsContext.Provider>
    </GraphContext.Provider>
  );
}

export default App;
