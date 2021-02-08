import React from 'react';
import { VictoryPie, VictoryTheme, VictoryLabel } from 'victory';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import DateRangeSearch from '../shared/DateRangeSearch';

const pieData = [
  {
    x: 'Utilities',
    y: 340,
  },
  {
    x: 'Groceries',
    y: 250,
  },
  {
    x: 'Entertainment',
    y: 40,
  },
  {
    x: 'Misc',
    y: 1000,
  },
];

const useStyles = makeStyles(() => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: 650,
  },
}));

function AvgExpByCategory() {
  const classes = useStyles();
  const [data] = React.useState(pieData);
  const [fromDate, selectFromDate] = React.useState(new Date());
  const [toDate, selectToDate] = React.useState(new Date());

  return (
    <div className={classes.root}>
      <DateRangeSearch
        fromDate={fromDate}
        toDate={toDate}
        selectFromDate={selectFromDate}
        selectToDate={selectToDate}
      />
      <Paper elevation={0}>
        <svg viewBox="0 0 400 400">
          <VictoryPie
            standalone={false}
            innerRadius={50}
            data={data}
            width={400}
            height={400}
            theme={VictoryTheme.material}
            padAngle={5}
            labelPosition="centroid"
            labelPlacement="perpendicular"
            labelComponent={(
              <VictoryLabel
                style={[
                  { fontSize: 10, fill: '#ffffff' },
                  { fontSize: 10, fill: '#ffa500' },
                ]}
                text={({ datum }) => `${datum.x}\n $ ${datum.y}`}
              />
              )}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{ fontSize: 12, fill: '#8b8b8b' }}
            x={200}
            y={198}
            text={'Spent \nper category'}
          />
        </svg>
      </Paper>
    </div>
  );
}

export default AvgExpByCategory;
