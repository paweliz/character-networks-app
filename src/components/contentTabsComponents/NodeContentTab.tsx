import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppStateContext } from '../../contexts/AppStateContext';
import { GraphRefresherContext } from '../../contexts/GraphRefresherContext';
import { SelectedNodeContext } from '../../contexts/SelectedNodeContext';
import BaseButton from '../BaseButton';
import ControllableList, { ControllableListElement } from '../ControlableList/ControllableList';
import { AppMode, AppState } from '../../types';
import "./tabStyles.css"

interface NodeContentTabProps {

}


const NodeContentTab : FunctionComponent<NodeContentTabProps> = () => {

  const selectedNode = useContext(SelectedNodeContext);
  const state = useContext(AppStateContext);
  const refresh = useContext(GraphRefresherContext);
  let { id } = useParams();
  const [fetchedSettings, setFetchedSettings] = useState<any | null>(null);
  const [fetchingSettingsFinished, setFetchingSettingsFinished] = useState<boolean>(false);
  const [fetchedStatistics, setFetchedStatistics] = useState<any | null>(null);
  const [fetchingStatisticsFinished, setFetchingStatisticsFinished] = useState<boolean>(false);
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
  const [refetcher, setRefetcher] = useState<boolean>(false);

  const refetch = () => {
    setRefetcher(!refetcher);
  }

  useEffect(() => {
    state.updateState({
      ...state.state,
      mode: AppMode.normal,
    });
    return () => {
      state.updateState({
        ...state.state,
        mode: AppMode.normal,
      });
    }
  }, []);

  useEffect(() => {
    if (selectedNode.nodeId === null) return;
    state.updateState({
      ...state.state,
      mode: AppMode.normal,
    });
    setErrorOccurred(false);

    setFetchingSettingsFinished(false);
    //settings
    fetch(`http://${process.env.REACT_APP_BACKEND_ADDRESS}:${process.env.REACT_APP_BACKEND_PORT}/graph/${id}/node/${selectedNode.nodeId.value}/settings`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      setFetchedSettings(data);
      console.log(data)
    }).catch(e => {
      setErrorOccurred(true);
      setFetchedSettings(null);
    }).finally(() => {
      setFetchingSettingsFinished(true);
    });

    setFetchingStatisticsFinished(false);
    //statistics
    fetch(`http://${process.env.REACT_APP_BACKEND_ADDRESS}:${process.env.REACT_APP_BACKEND_PORT}/graph/${id}/node/${selectedNode.nodeId.value}/statistics`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setFetchedStatistics(data);
    }).catch(e => {
      setErrorOccurred(true);
      setFetchedSettings(null);
    }).finally(() => {
      setFetchingStatisticsFinished(true);
    });
  }, [selectedNode.nodeId, refetcher]);

  const changeVisibility = () => {
    if (selectedNode.nodeId === null) return;

    fetch(`http://${process.env.REACT_APP_BACKEND_ADDRESS}:${process.env.REACT_APP_BACKEND_PORT}/graph/${id}/node/${selectedNode.nodeId.value}/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isHidden: !fetchedSettings.isHidden,
      }),
    })
    .then(response => response.json())
    .then(data => {
      
    }).catch(e => {

    }).finally(() => {
      refresh();
      refetch();
    });
  }

  return (
    <div className="flex flex-col grow basis-0">
      {
        !errorOccurred && fetchingStatisticsFinished && fetchingSettingsFinished &&
        <div className="text-base records flex flex-col grow basis-0">
          <div className="record">
            <div className="label">
              Node name: 
            </div>
            <div className="label-data">
              {fetchedStatistics.name}
            </div>
          </div>
          <div className="record">
            <div className="label">
              Node id: 
            </div>
            <div className="label-data">
              {fetchedStatistics.id}
            </div>
          </div>
          <div className="record">
            <div className="label">
              Node status: 
            </div>
            <div className="label-data">
              {fetchedSettings.isHidden ? "hidden" : "visible"}
            </div>
          </div>
          <div>
            <BaseButton text={fetchedSettings.isHidden ? "Show" : "Hide"} onClick={changeVisibility}
              className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded-full hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              overrideClass={true}/>
            <BaseButton text={'Merge'} onClick={() => {
              console.log(state.state.mode)
              state.updateState({
                ...state.state,
                mode: state.state.mode === AppMode.merge ? AppMode.normal : AppMode.merge,
              })
            }}
              active={state.state.mode === AppMode.merge}
              activeClassName="bg-fuchsia-800 ring ring-rose-200"
              className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded-full hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              overrideClass={true}/>
          </div>
          <div className="record">
            <div className="label">
              Node type: 
            </div>
            <div className="label-data">
              {fetchedStatistics.type || "CASE"+String.fromCharCode(160)} 
            </div>
          </div>
          <div className="record">
            <div className="label">
              Node value: 
            </div>
            <div className="label-data">
              {fetchedStatistics.value}
            </div>
          </div>
          <div className="flex flex-col grow basis-0 record flex-auto">
            <div className="label">
              Node's edges ({fetchedStatistics.connectedTo.length}): 
            </div>
            <div className="flex flex-col grow basis-0">
              <ControllableList 
                className="flex flex-col grow basis-0"
                listArray={fetchedStatistics.connectedTo } 
                elementRenderer={(elProp) =>
                  (<>
                    <ControllableListElement onClick={() => {
                      selectedNode.updateNodeId({value: elProp.id});
                    }}>
                      <div className="flex items-center justify-items-center h-full pl-2">
                        <span>
                          {elProp.name}
                        </span>
                        <span className="italic">
                          &nbsp;(edge value: {elProp.connectionValue})
                        </span>
                      </div>
                    </ControllableListElement>
                  </>)
                }/>
            </div>
          </div>
          
        </div>
      }
    </div>
  );
};

export default NodeContentTab;
