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

interface edgesFromJSON {
  first: string;
  second: string;
  value: number;
}

const dataFromJSON = JSON.parse(`{"edges": [
  {
      "first": "Paweł",
      "second": "Jacek",
      "value": 2
  },
  {
      "first": "Paweł",
      "second": "Wrocław",
      "value": 1
  },
  {
      "first": "Paweł",
      "second": "wiejski",
      "value": 1
  },
  {
      "first": "Paweł",
      "second": "dworzec główny",
      "value": 2
  },
  {
      "first": "Paweł",
      "second": "podkarpacki",
      "value": 2
  },
  {
      "first": "Jacek",
      "second": "Wrocław",
      "value": 3
  },
  {
      "first": "Jacek",
      "second": "dolnośląski",
      "value": 1
  },
  {
      "first": "Jacek",
      "second": "wiejski",
      "value": 1
  },
  {
      "first": "Wrocław",
      "second": "dolnośląski",
      "value": 2
  },
  {
      "first": "dolnośląski",
      "second": "wiejski",
      "value": 1
  },
  {
      "first": "wiejski",
      "second": "dworzec główny",
      "value": 1
  },
  {
      "first": "dworzec główny",
      "second": "podkarpacki",
      "value": 1
  }
],
"id": "cc5aa68a-cd26-4854-8a92-d7cc56917d6f",
"nodes":[
  {
      "id": 1,
      "title": "nam_liv",
      "label": "Paweł",
      "count": 3
   },
  {
      "count": 2,
      "id": 2,
      "label": "Jacek",
      "title": "nam_liv"
  },
  {
      "count": 2,
      "id": 3,
      "label": "Wrocław",
      "title": "nam_loc"
  },
  {
      "count": 1,
      "id": 4,
      "label": "dolnośląski",
      "title": "nam_loc"
  },
  {
      "count": 1,
      "id": 5,
      "label": "podkarpacki",
      "title": "nam_loc"
  },
  {
      "count": 1,
      "id": 6,
      "label": "wiejski",
      "title": "nam_fac"
  },
  {
      "count": 1,
      "id": 7,
      "label": "dworzec główny",
      "title": "nam_fac"
  }
]
}`);

const edgesObj1 = dataFromJSON.edges.map((item: edgesFromJSON) => {
  return {
    from: item.first,
    to: item.second,
    //value: item.value,
  };
});

function App() {
  const [readText, setReadText] = useState<string | ArrayBuffer | null>(null);
  const [graphId, setGraphId] = useState<string>(uuid());
  const [graph, setGraph] = useState<GraphType>({
    nodes: dataFromJSON.nodes,
    edges: edgesObj1,
  });

  const [filteredGraph, setFilteredGraph] = useState<GraphType>(graph);

  const [globalSettings, setGlobalSettings] = useState<GlobalGraphSettings>({
    minCountThreshold: 3,
    maxCountThreshold: 5,
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

  const events = {};

  useEffect(() => {
    setFilteredGraph({
      ...graph,
      nodes: graph.nodes.filter((node) => {
        return (
          node.count >= globalSettings.minCountThreshold &&
          node.count <= globalSettings.maxCountThreshold
        );
      }),
    });
    setGraphId(uuid());
  }, [graph, globalSettings]);

  return (
    <GraphContext.Provider value={graph}>
      <GlobalGraphSettingsContext.Provider
        value={{
          settings: globalSettings,
          updateSettings: setGlobalSettings,
        }}>
        <div className='flex justify-center justify-items-center'>
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
              <InputComponent
                inputState={readText}
                setInputState={setReadText}
              />
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
            <RightTab />
          </div>
        </div>
      </GlobalGraphSettingsContext.Provider>
    </GraphContext.Provider>
  );
}

export default App;
