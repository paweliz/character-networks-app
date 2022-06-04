import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GraphRefresherContext } from '../../contexts/GraphRefresherContext';
import { SelectedNodeContext } from '../../contexts/SelectedNodeContext';
import BaseButton from '../BaseButton';
import "./tabStyles.css"

interface NodeContentTabProps {

}

const NodeContentTab : FunctionComponent<NodeContentTabProps> = () => {

  const selectedNode = useContext(SelectedNodeContext);
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
    if (selectedNode.nodeId === null) return;
    setErrorOccurred(false);

    setFetchingSettingsFinished(false);
    //settings
    fetch(`http://${process.env.REACT_APP_BACKEND_ADDRESS}:${process.env.REACT_APP_BACKEND_PORT}/graph/${id}/node/${selectedNode.nodeId}/settings`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      setFetchedSettings(data);
    }).catch(e => {
      setErrorOccurred(true);
      setFetchedSettings(null);
    }).finally(() => {
      setFetchingSettingsFinished(true);
    });

    setFetchingStatisticsFinished(false);
    //statistics
    fetch(`http://${process.env.REACT_APP_BACKEND_ADDRESS}:${process.env.REACT_APP_BACKEND_PORT}/graph/${id}/node/${selectedNode.nodeId}/statistics`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
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

    fetch(`http://${process.env.REACT_APP_BACKEND_ADDRESS}:${process.env.REACT_APP_BACKEND_PORT}/graph/${id}/node/${selectedNode.nodeId}/settings`, {
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
    <div>
      {
        !errorOccurred && fetchingStatisticsFinished && fetchingSettingsFinished &&
        <div className="text-base records">
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
              className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              overrideClass={true}/>
            <BaseButton text={'Merge'} onClick={() => {}}
              className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
          <div className="record">
            <div className="label">
              Node edges: 
            </div>
            <div>
              in future...
            </div>
          </div>
          
        </div>
      }
    </div>
  );
};

export default NodeContentTab;
