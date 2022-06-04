import { useState, useEffect } from 'react';
import './GraphApp.css';
import Graph from 'react-graph-vis';
import InputComponent from './components/InputComponent';
import BaseButton from './components/BaseButton';
import RightTab from './components/RightTab';
import { AppMode, AppState, GlobalGraphSettings, GraphType } from './types';
import { GraphContext } from './contexts/GraphContext';
import { GlobalGraphSettingsContext } from './contexts/SettingsContext';
import { v4 as uuid } from 'uuid';
import { GraphRefresherContext } from './contexts/GraphRefresherContext';
import TextProvider from './components/TextProvider';
import { Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { AppStateContext, AppStateContextType } from './contexts/AppStateContext';
import { SelectedNodeContext, SelectedNodeContextType } from './contexts/SelectedNodeContext';

interface edgesFromJSON {
  first: string;
  second: string;
  fromNode: number;
  toNode: number
  value: number;
}

const dataFromJSON = JSON.parse(`{
	"edges": [
		{
			"first": "polski",
			"fromNode": 10,
			"second": "Lech",
			"toNode": 1,
			"value": 1
		},
		{
			"first": "polski",
			"fromNode": 10,
			"second": "Czech",
			"toNode": 2,
			"value": 1
		},
		{
			"first": "Lech",
			"fromNode": 1,
			"second": "Czech",
			"toNode": 2,
			"value": 3
		},
		{
			"first": "Lech",
			"fromNode": 1,
			"second": "Rus",
			"toNode": 3,
			"value": 4
		},
		{
			"first": "Lech",
			"fromNode": 1,
			"second": "Wisła",
			"toNode": 5,
			"value": 1
		},
		{
			"first": "Lech",
			"fromNode": 1,
			"second": "Odra",
			"toNode": 6,
			"value": 1
		},
		{
			"first": "Lech",
			"fromNode": 1,
			"second": "gnieźnieński",
			"toNode": 11,
			"value": 2
		},
		{
			"first": "Lech",
			"fromNode": 1,
			"second": "Polska",
			"toNode": 8,
			"value": 1
		},
		{
			"first": "Lech",
			"fromNode": 1,
			"second": "Polak",
			"toNode": 13,
			"value": 1
		},
		{
			"first": "Lech",
			"fromNode": 1,
			"second": "Lechita",
			"toNode": 4,
			"value": 1
		},
		{
			"first": "Czech",
			"fromNode": 2,
			"second": "Rus",
			"toNode": 3,
			"value": 3
		},
		{
			"first": "Czech",
			"fromNode": 2,
			"second": "Wisła",
			"toNode": 5,
			"value": 1
		},
		{
			"first": "Czech",
			"fromNode": 2,
			"second": "Odra",
			"toNode": 6,
			"value": 1
		},
		{
			"first": "Czech",
			"fromNode": 2,
			"second": "Polska",
			"toNode": 8,
			"value": 1
		},
		{
			"first": "Czech",
			"fromNode": 2,
			"second": "Ruś",
			"toNode": 9,
			"value": 1
		},
		{
			"first": "Czech",
			"fromNode": 2,
			"second": "Polak",
			"toNode": 13,
			"value": 1
		},
		{
			"first": "Rus",
			"fromNode": 3,
			"second": "Wisła",
			"toNode": 5,
			"value": 1
		},
		{
			"first": "Rus",
			"fromNode": 3,
			"second": "Odra",
			"toNode": 6,
			"value": 1
		},
		{
			"first": "Rus",
			"fromNode": 3,
			"second": "gnieźnieński",
			"toNode": 11,
			"value": 1
		},
		{
			"first": "Rus",
			"fromNode": 3,
			"second": "Polska",
			"toNode": 8,
			"value": 1
		},
		{
			"first": "Rus",
			"fromNode": 3,
			"second": "Ruś",
			"toNode": 9,
			"value": 1
		},
		{
			"first": "Wisła",
			"fromNode": 5,
			"second": "Odra",
			"toNode": 6,
			"value": 1
		},
		{
			"first": "gnieźnieński",
			"fromNode": 11,
			"second": "Polska",
			"toNode": 8,
			"value": 1
		},
		{
			"first": "Ruś",
			"fromNode": 9,
			"second": "Polak",
			"toNode": 13,
			"value": 1
		},
		{
			"first": "Ruś",
			"fromNode": 9,
			"second": "Lechita",
			"toNode": 4,
			"value": 1
		},
		{
			"first": "Polak",
			"fromNode": 13,
			"second": "Lechita",
			"toNode": 4,
			"value": 1
		}
	],
	"id": "cc5aa68a-cd26-4854-8a92-d7cc56917d6f",
	"nodes": [
		{
			"count": 6,
			"id": 1,
			"label": "Lech",
			"title": "nam_liv"
		},
		{
			"count": 1,
			"id": 2,
			"label": "Czech",
			"title": "nam_liv"
		},
		{
			"count": 1,
			"id": 3,
			"label": "Rus",
			"title": "nam_liv"
		},
		{
			"count": 1,
			"id": 4,
			"label": "Lechita",
			"title": "nam_liv"
		},
		{
			"count": 1,
			"id": 5,
			"label": "Wisła",
			"title": "nam_loc"
		},
		{
			"count": 1,
			"id": 6,
			"label": "Odra",
			"title": "nam_loc"
		},
		{
			"count": 2,
			"id": 7,
			"label": "Czech",
			"title": "nam_loc"
		},
		{
			"count": 1,
			"id": 8,
			"label": "Polska",
			"title": "nam_loc"
		},
		{
			"count": 1,
			"id": 9,
			"label": "Ruś",
			"title": "nam_loc"
		},
		{
			"count": 1,
			"id": 10,
			"label": "polski",
			"title": "nam_adj"
		},
		{
			"count": 1,
			"id": 11,
			"label": "gnieźnieński",
			"title": "nam_adj"
		},
		{
			"count": 1,
			"id": 12,
			"label": "Rus",
			"title": "nam_org"
		},
		{
			"count": 1,
			"id": 13,
			"label": "Polak",
			"title": "nam_org"
		},
		{
			"count": 1,
			"id": 14,
			"label": "Rus",
			"title": "nam_pro"
		}
	]
}`);

const edgesObj1 = dataFromJSON.edges.map((item: edgesFromJSON) => {
  return {
    from: item.fromNode,
    to: item.toNode,
    //value: item.value,
  };
});

function GraphApp() {
  const [readText, setReadText] = useState<string | ArrayBuffer | null>(null);
  const [refreshValue, setRefreshValue] = useState<boolean>(false);
  const [graphId, setGraphId] = useState<string>(uuid());
  const [filteredGraph, setFilteredGraph] = useState<GraphType>({
    nodes: dataFromJSON.nodes,
    edges: edgesObj1,
  });

  const [globalSettings, setGlobalSettings] = useState<GlobalGraphSettings>({
    minCountThreshold: 3,
    maxCountThreshold: 5,
  });

	const [appState, setAppState] = useState<AppState>({mode: AppMode.normal});
	const [selectedNode, setSelectedNode] = useState<string | null>(null);

	const [modalOpen, setModalOpen] = useState<boolean>(false);

	let { id } = useParams();

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: '#000000',
    },
    height: '500px',
  };

  const events = {
		select: ({nodes}: any) => {
			if (nodes.length > 0)
				setSelectedNode(nodes[0]);
			else
				setSelectedNode(null);
		}
	};

  const refresh = () => {
    setRefreshValue(!refreshValue);
  }

  useEffect(() => {
    //setFilteredGraph(graph);
    //'http://localhost:5000/graph/cc5aa68a-cd26-4854-8a92-d7cc56917d5f/filtered'
    fetch(`http://${process.env.REACT_APP_BACKEND_ADDRESS}:${process.env.REACT_APP_BACKEND_PORT}/graph/${id}/filtered`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      if (data) {
        const readable = {
          ...data,
          edges: data.edges.map((e: edgesFromJSON) => ({
            from: e.fromNode,
            to: e.toNode,
          })),
        }
        setFilteredGraph(readable);
      } else {
        setFilteredGraph(dataFromJSON);
      }
			setGraphId(uuid());
    }).catch(e => {
      setFilteredGraph(dataFromJSON);
			setGraphId(uuid());
    });/*
    setFilteredGraph({
      ...graph,
      nodes: graph.nodes.filter((node) => {
        return (
          node.count >= globalSettings.minCountThreshold &&
          node.count <= globalSettings.maxCountThreshold
        );
      }),
    });*/
    setGraphId(uuid());
  }, [globalSettings, refreshValue]);


  return (
    <GraphRefresherContext.Provider value={refresh}>
        <GlobalGraphSettingsContext.Provider
          value={{
            settings: globalSettings,
            updateSettings: setGlobalSettings,
          }}
				>
					<AppStateContext.Provider value={{
						state: appState,
						updateState: setAppState,
					}}>
						<SelectedNodeContext.Provider value={{
							nodeId: selectedNode,
							updateNodeId: setSelectedNode,
						}}>
							<Modal show={modalOpen} onHide={() => setModalOpen(false)}>
								<Modal.Header closeButton>
          				<Modal.Title>Analyze text</Modal.Title>
       				 	</Modal.Header>
								<Modal.Body>
									<TextProvider/>
  							</Modal.Body>
      				</Modal>
          		<div className='flex justify-center justify-items-center'>
          		  <div className='p-4 flex-none flex-row justify-center items-center justify-items-center w-3/4 m-0'>
          		    {/* <img src={logo} className='App-logo' alt='logo' />
          		      <p>
          		        Edit <code>src/App.tsx</code> and save to reload.
          		      </p> */}
          		    <div className='flex self-center'>
          		      <BaseButton
          		        text={'Input text'}
          		        onClick={() => setModalOpen(true)}
          		      />
          		    </div>
          		    <div className='flex self-center'>
          		    </div>
          		    <div className='flex self-center'>
          		      <Graph
          		        key={graphId} //TODO: change in different palce
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
						</SelectedNodeContext.Provider>
					</AppStateContext.Provider>
        </GlobalGraphSettingsContext.Provider>
    </GraphRefresherContext.Provider>
  );
}

export default GraphApp;
