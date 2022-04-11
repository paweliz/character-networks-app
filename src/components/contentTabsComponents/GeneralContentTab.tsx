
import Slider from "rc-slider";
import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import 'rc-slider/assets/index.css';
import { GlobalGraphSettingsContext } from "../../contexts/SettingsContext";
import { GraphContext } from "../../contexts/GraphContext";

interface GeneralContentTabProps {
  /* nodes props etc */
}

const GeneralContentTab: FunctionComponent<GeneralContentTabProps> = () => {

  const { settings, updateSettings } = useContext(GlobalGraphSettingsContext);
  const graph = useContext(GraphContext);

  const [minMaxValuesNodesThreshold, setMinMaxValuesNodesThreshold] = useState({
    min: 1,
    max: 100,
  });

  const [internalMinMax, setInternalMinMax] = useState({
    min: settings.minCountThreshold,
    max: settings.maxCountThreshold,
  });

  useEffect(() => {
    if (graph !== null && graph.nodes.length > 0) {
      let min = graph.nodes[0].count;
      let max = min;

      min = graph.nodes.reduce((prev, curr) => {
        return prev.count < curr.count ? prev : curr;
      }).count;
      max = graph.nodes.reduce((prev, curr) => {
        return prev.count > curr.count ? prev : curr;
      }).count;

      setMinMaxValuesNodesThreshold({
        min: min,
        max: max,
      });
      setInternalMinMax({
        min: settings.minCountThreshold,
        max: settings.maxCountThreshold,
      });

    } else {
      setMinMaxValuesNodesThreshold({
        min: 0,
        max: 0,
      });
      setInternalMinMax({
        min: 0,
        max: 0,
      });
    }
  }, [graph]);

  let marks: any = {}
  marks[minMaxValuesNodesThreshold.min] = minMaxValuesNodesThreshold.min;
  marks[minMaxValuesNodesThreshold.max] = minMaxValuesNodesThreshold.max;
  return (
    <div className="text-base">
      <div className="text-lg semi-bold">
        Nodes count thresholds:
      </div>
      <div className="p-2">
        <Slider
          range
          defaultValue={[settings.minCountThreshold, settings.maxCountThreshold]}
          min={minMaxValuesNodesThreshold.min}
          max={minMaxValuesNodesThreshold.max}
          marks={marks}
          onChange={(value) => {
            if (Array.isArray(value)) {
              setInternalMinMax({
                min: value[0] < value[1] ? value[0] : value[1],
                max: value[0] > value[1] ? value[0] : value[1], 
              });
            }
          }}
          onAfterChange={(value) => {
            if (Array.isArray(value)) {
              updateSettings({
                minCountThreshold: value[0] < value[1] ? value[0] : value[1],
                maxCountThreshold: value[0] > value[1] ? value[0] : value[1], 
              });
            }
          }}
        />
      </div>
      <div className="mt-4 flex justify-evenly">
        <div>
          min: {internalMinMax.min}
        </div>
        <div>
          max: {internalMinMax.max}
        </div>
      </div>
    </div>
  );
}

export default GeneralContentTab;

