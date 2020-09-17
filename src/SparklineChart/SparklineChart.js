import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { ChartTooltip } from './ChartTooltip';
import { getDatasetMax, classSelector } from './utils';

const LINE_WIDTH = 2;
const AREA_MASK_ID = 'areaMaskId';
const TOOLTIP_ELEMENT_RADIUS = 4;
const DEFAULT_COLOR = '#3370FB';

/** SparklineChart */
class SparklineChart extends React.PureComponent {
  constructor(props) {
    super(props);
    const { getTooltipContent, highlightedStartingIndex } = props;

    this.enableTooltip =
      getTooltipContent && typeof getTooltipContent === 'function';
    this.randomComponentId = Math.random().toString();
    this.chartContext = {};

    this.svgRef = createRef(null);
    this.componentRef = createRef(null);
    this.enableHighlightedAreaEffect = highlightedStartingIndex > 0;

    this.state = {
      hoveredLabels: [],
    };
  }

  _useCreateContext = () => {
    const halfWidth = LINE_WIDTH / 2;
    const {
      width = 200,
      height = 40,
      data,
      highlightedStartingIndex = 0,
      color = DEFAULT_COLOR,
    } = this.props;

    const margin = {
      top: halfWidth + 2,
      right: halfWidth,
      bottom: halfWidth,
      left: halfWidth,
    };

    const coloredData = { ...data, color };
    const innerTop = margin.top;
    const innerLeft = margin.left;
    const innerHeight = height - innerTop - margin.bottom;
    const innerWidth = width - innerLeft - margin.right;
    const adaptedDataSet = {
      values: this._getValues(data),
    };
    const minMax = getDatasetMax([adaptedDataSet]);
    const firstLabel = this._getLabelAt(data, 0);
    const lastLabel = this._getLabelAt(data, data.pairs.length - 1);

    const xScale = d3
      .scaleTime()
      .domain([firstLabel, lastLabel])
      .range([innerLeft, innerWidth]);
    const yScale = d3
      .scaleLinear()
      .domain([0, minMax.max])
      .range([innerHeight, innerTop]);

    const lineGenerator = d3
      .line()
      .x((dataPoint, i) => {
        return xScale(data.pairs[i].label);
      })
      .y(dataPoint => {
        return yScale(dataPoint);
      })
      .curve(d3.curveMonotoneX);

    const areaGenerator = d3
      .area()
      .x((dataPoint, i) => {
        return xScale(data.pairs[i].label);
      })
      .y0(() => innerHeight)
      .y1(dataPoint => {
        return yScale(dataPoint);
      })
      .curve(d3.curveMonotoneX);

    return {
      margin,
      width,
      height,
      innerTop,
      innerLeft,
      innerBottom: margin.top + innerHeight,
      innerWidth,
      innerHeight,
      data: coloredData,
      xScale,
      yScale,
      minMax,
      highlightedStartingIndex,
      lineGenerator,
      areaGenerator,
    };
  };

  _getLabelAt = (data, position) => {
    return data.pairs[position] && data.pairs[position].label;
  };

  _getValueAt(data, position) {
    return data.pairs[position] && data.pairs[position].value;
  }

  _getValues = data => data.pairs.map(pair => pair.value);
  _getLabels = data => data.pairs.map(pair => pair.label);

  _drawSparkline = () => {
    const { width, height, data } = this.chartContext;
    const labels = this._getLabels(data);

    const container = d3.select(this.svgRef.current);

    container.attr('width', width).attr('height', height);
    const dataContainer = container.select(classSelector('dataContainer'));

    this._drawLines(dataContainer);
    d3.select(this.componentRef.current)
      .on('mouseleave', () => {
        this.setState({ hoveredLabels: [] });
      })
      .on('mousemove', d => {
        const { pointer } = d3;
        const dateUnderPointer = this.chartContext.xScale.invert(pointer(d)[0]);
        const currentDateIndex = d3
          .bisector(function(date) {
            return date;
          })
          .left(labels, dateUnderPointer, 1);

        const beforeDateIndex = currentDateIndex - 1;

        const beforeDate = labels[beforeDateIndex];
        const afterDate = labels[currentDateIndex];
        const closestDate =
          +dateUnderPointer - +beforeDate > +afterDate - +dateUnderPointer
            ? afterDate
            : beforeDate;

        this.setState({ hoveredLabels: [closestDate] });
      });
  };

  _getLineColorId(dataSet, componentId) {
    return `${dataSet.name}${componentId}color`;
  }

  _getAreaMaskId(componentId) {
    return `${AREA_MASK_ID}${componentId}`;
  }

  _drawLines = dataContainer => {
    const { data, lineGenerator, areaGenerator } = this.chartContext;

    const dataSets = [data];
    dataContainer
      .selectAll('.chartLines')
      .data(dataSets, dataSet => {
        return dataSet.name;
      })
      .join('g')
      .attr('class', 'chartLines')
      .selectAll('g')
      .data(dataSet => {
        return [dataSet];
      })
      .join(
        enter => {
          const group = enter.append('g');
          group
            .append('path')
            .attr('class', 'innerArea')
            .attr(
              'mask',
              `url(#${this._getAreaMaskId(this.randomComponentId)})`,
            )
            .attr('fill', dataSet => {
              return `url(#${dataSet.color})`;
            })
            .attr('d', dataSet => {
              return areaGenerator(dataSet.pairs.map(() => 0));
            });
          group
            .append('path')
            .attr('class', 'innerLineBack')
            .attr('fill', 'none')
            .attr('stroke-width', LINE_WIDTH + 4)
            .attr('stroke-linecap', 'round')
            .attr('stroke', 'white')
            .attr('d', dataSet => {
              return lineGenerator(dataSet.pairs.map(() => 0));
            });

          group
            .append('path')
            .attr('class', 'innerLine')
            .attr('fill', 'none')
            .attr('stroke-width', LINE_WIDTH)
            .attr('stroke-linecap', 'round')
            .attr('stroke', dataSet => {
              return `url(#${this._getLineColorId(
                dataSet,
                this.randomComponentId,
              )})`;
            })
            .attr('d', dataSet => {
              return lineGenerator(dataSet.pairs.map(() => 0));
            });

          this._updateLines(group);

          return group;
        },
        update => {
          this._updateLines(update);
          return update;
        },
      );
  };

  _updateLines = container => {
    const { lineGenerator, areaGenerator } = this.chartContext;
    this._updateComponent(container, '.innerLine', set => {
      return lineGenerator(this._getValues(set));
    });

    this._updateComponent(container, '.innerLineBack', set => {
      return lineGenerator(this._getValues(set));
    });

    this._updateComponent(container, '.innerArea', set => {
      return areaGenerator(this._getValues(set));
    });
  };

  _updateComponent = (container, className, fncUpdater) => {
    container
      .select(className)
      .transition()
      .duration(300)
      .ease(d3.easeQuadIn)
      .attr('d', fncUpdater);
  };

  componentDidMount() {
    this._drawSparkline();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this._drawSparkline();
    }
  }

  _updateContext() {
    this.chartContext = this._useCreateContext();
  }

  render() {
    this._updateContext();
    const { getTooltipContent, className, dataHook } = this.props;
    const { hoveredLabels } = this.state;
    const context = this.chartContext;
    const {
      data,
      highlightedStartingIndex,
      innerWidth,
      height,
      width,
    } = context;
    const highlightedStartBefore = context.xScale(
      this._getLabelAt(data, highlightedStartingIndex - 1),
    );
    const highlightedStart = context.xScale(
      this._getLabelAt(data, highlightedStartingIndex),
    );
    const highlightedRelativeLocation = highlightedStart / innerWidth;
    const inter = (highlightedStart - highlightedStartBefore) / 2 / innerWidth;
    const labels = this._getLabels(data);

    const hoveredLabelsIndexes = hoveredLabels.map(dimension => {
      return d3
        .bisector(function(d) {
          return d;
        })
        .left(labels, dimension, 0);
    });

    const dataPointsTooltipColors = [];
    const dataPoints = hoveredLabelsIndexes.reduce(
      (pointsData, currentSelectedIndex) => {
        const currentLabel = this._getLabelAt(data, currentSelectedIndex);
        const currentValue = this._getValueAt(data, currentSelectedIndex);

        const pointData = {
          content:
            getTooltipContent &&
            typeof getTooltipContent === 'function' &&
            getTooltipContent(currentSelectedIndex),
          xCoordinate: context.xScale(currentLabel),
          yCoordinate:
            context.yScale(currentValue) - TOOLTIP_ELEMENT_RADIUS / 2,
        };
        pointsData.push(pointData);
        dataPointsTooltipColors.push(data.color);
        return pointsData;
      },
      [],
    );
    return (
      <div
        style={{ width, height, position: 'relative' }}
        ref={this.componentRef}
        className={className}
        data-hook={dataHook}
      >
        <svg style={{ overflow: 'visible', zIndex: 1 }} ref={this.svgRef}>
          <defs>
            <mask id={this._getAreaMaskId(this.randomComponentId)}>
              <rect
                x={highlightedStart}
                y="0"
                width={width}
                height={height}
                fill="white"
              />
            </mask>

            <linearGradient
              gradientUnits={'userSpaceOnUse'}
              key={`${data.name}a`}
              id={this._getLineColorId(data, this.randomComponentId)}
              x1="0px"
              y1={`0px`}
              x2={`${innerWidth}px`}
              y2={'0px'}
            >
              <stop
                offset="0"
                style={{ stopColor: '#dfe5eb', stopOpacity: 1 }}
              />
              {this.enableHighlightedAreaEffect && (
                <stop
                  offset={highlightedRelativeLocation - inter}
                  style={{ stopColor: '#dfe5eb', stopOpacity: 1 }}
                />
              )}
              <stop
                offset={highlightedRelativeLocation}
                style={{ stopColor: data.color, stopOpacity: 1 }}
              />
              <stop
                offset={highlightedRelativeLocation}
                style={{ stopColor: data.color, stopOpacity: 1 }}
              />
              <stop
                offset="1"
                style={{
                  stopColor: data.color,
                  stopOpacity: 1,
                }}
              />
            </linearGradient>

            <linearGradient
              gradientUnits={'userSpaceOnUse'}
              key={data.name}
              id={data.color}
              x1="0px"
              y1={`${context.innerHeight}px`}
              x2="0px"
              y2={'0px'}
            >
              <stop
                offset="10%"
                style={{ stopColor: data.color, stopOpacity: 0 }}
              />
              <stop
                offset="90%"
                style={{
                  stopColor: data.color,
                  stopOpacity: 0.5,
                }}
              />
            </linearGradient>
          </defs>
          <g>
            <g className={'dataContainer'}></g>
            {this.enableTooltip &&
              dataPoints.map((pointData, index) => {
                return (
                  <g
                    key={index}
                    transform={`translate(${
                      pointData.xCoordinate
                    }, ${pointData.yCoordinate + TOOLTIP_ELEMENT_RADIUS / 2})`}
                  >
                    <circle
                      r={TOOLTIP_ELEMENT_RADIUS}
                      fill={dataPointsTooltipColors[index]}
                    ></circle>
                  </g>
                );
              })}
          </g>
        </svg>
        {this.enableTooltip && <ChartTooltip dataPoints={dataPoints} />}
      </div>
    );
  }
}

SparklineChart.displayName = 'SparklineChart';

SparklineChart.propTypes = {
  /** Applied as data-hook HTML attribute that can be used in the tests */
  dataHook: PropTypes.string,

  /** A css class to be applied to the component's root element */
  className: PropTypes.string,

  /** Sets the width of the sparkline (pixels) */
  width: PropTypes.number,

  /** Sets the height of the sparkline (pixels) */
  height: PropTypes.number,

  /** Chart data */
  data: PropTypes.shape({
    name: PropTypes.string,
    pairs: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.node,
        value: PropTypes.number,
      }),
    ),
  }),

  /** Sets the color of the sparkline  */
  color: PropTypes.string,

  /** Indicates the starting index of the highlighted area. Default is 0  */
  highlightedStartingIndex: PropTypes.number,

  /** Tooltip content (JSX) getter function.  */
  getTooltipContent: PropTypes.func,
};

SparklineChart.defaultProps = {};

export default SparklineChart;
