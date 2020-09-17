import React from 'react';
import { classes } from './ChartTooltip.st.css';
import Popover from '../Popover';
import { dataHooks } from './constants';

export const ChartTooltip = props => {
  const { dataPoints } = props;

  return (
    <div style={{ fontSize: 0 }}>
      {dataPoints.length > 0 &&
        dataPoints.map((pointData, index) => {
          return (
            <div
              key={index}
              className={classes.absolutePosition}
              style={{
                left: pointData.xCoordinate,
                top: pointData.yCoordinate,
              }}
            >
              <Popover
                theme="dark"
                showArrow
                shown
                appendTo="parent"
                placement="top"
                dynamicWidth
                dataHooks={dataHooks.chartPopover}
              >
                <Popover.Element>{null}</Popover.Element>
                <Popover.Content>
                  <div className={classes.contentWrapper}>
                    {pointData.content}
                  </div>
                </Popover.Content>
              </Popover>
            </div>
          );
        })}
    </div>
  );
};
