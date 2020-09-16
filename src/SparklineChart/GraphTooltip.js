import React from 'react';
import { classes } from './GraphTooltip.st.css';
import Popover from '../Popover';

export const GraphTooltip = props => {
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
