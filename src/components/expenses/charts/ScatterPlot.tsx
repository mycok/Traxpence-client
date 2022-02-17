import React, { useState } from 'react';
// import { useSelector } from 'react-redux';

import {
  ScatterChart, Scatter, XAxis, YAxis,
  Tooltip, Cell, ResponsiveContainer,
} from 'recharts';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper, Box } from '@material-ui/core';

import SingleDateRange from '../../../shared/dates/SingleDateRange';
// import { RootState, useAppDispatch } from '../../../redux/store';
// import { fetchScatterPlotExpenseData } from '../../../redux/reducers/expenses/scatterplot';
import { colors } from '../../../theme';

const data = [
  {
    x: 7,
    y: 34,
  },
  {
    x: 11,
    y: 25,
  },
  {
    x: 1,
    y: 0,
  },
  {
    x: 3,
    y: 1000,
  },
];

const useStyles = makeStyles(() => createStyles({
  root: {
    display: 'flex',
    width: '630px',
    height: '360px',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
}));

function ScatterPlotGraph() {
  const classes = useStyles();
  // const dispatch = useAppDispatch();

  const [selectedDate, selectDate] = useState(new Date());

  // const { plotData } = useSelector((state: RootState) => state.expensePlotData);

  // useEffect(() => {
  //   dispatch(fetchScatterPlotExpenseData(selectedDate));
  // }, [dispatch, selectedDate]);

  return (
    <Box className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <SingleDateRange
          views={['month', 'year']}
          selectedDate={selectedDate}
          selectDate={selectDate}
        />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            width={630}
            height={360}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <XAxis type="number" dataKey="x" name="Months" />
            <YAxis type="number" dataKey="y" name="Expenditure" unit="$" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="A school" data={data} fill="#8884d8">
              {data.map((entry, index) => (
                <Cell key={`cell-${entry.y}`} fill={colors[index % colors.length]} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}

export default ScatterPlotGraph;
