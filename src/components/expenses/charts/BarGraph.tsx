/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  BarChart, Bar, XAxis, YAxis, Cell,
  ResponsiveContainer, LabelProps, Tooltip,
} from 'recharts';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper, Box } from '@material-ui/core';

import SingleDateRange from '../../../shared/dates/SingleDateRange';
import { ExpensesLoader } from '../../../shared/ContentLoader';
import NoGraphData from './NoGraphData';

import { useAppDispatch, RootState } from '../../../redux/store';
import { fetchAnnualExpenseData } from '../../../redux/reducers/expenses/annualExpData';
import { colors } from '../../../theme';

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

function BarGraph() {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [selectedDate, selectDate] = React.useState(new Date());
  const { isLoading, annualExpData } = useSelector((state: RootState) => state.annualExpenseData);

  useEffect(() => {
    dispatch(fetchAnnualExpenseData(selectedDate.getFullYear()));
  }, [selectedDate, dispatch]);

  if (isLoading) {
    return (
      <ExpensesLoader />
    );
  }

  if (annualExpData.length === 0) {
    return (
      <NoGraphData />
    );
  }

  return (
    <Box className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <SingleDateRange
          views={['year']}
          selectedDate={selectedDate}
          selectDate={selectDate}
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={630}
            height={360}
            data={annualExpData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="month" name="month" />
            <YAxis dataKey="amount" name="amount" />
            <Tooltip />
            <Bar
              dataKey="amount"
              fill="#0da86c"
              barSize={40}
              shape={<TriangleBar />}
              // label={{ position: 'top', fill: '#fff' }}
            >
              {annualExpData.map((exp, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}

export default BarGraph;

function getPath(x: number, y: number, width: number, height: number) {
  return `M${x},${y + height}
  C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
}

function TriangleBar(props: LabelProps) {
  const {
    fill, x, y, width, height,
  } = props;

  return <path d={getPath(x as number, y as number, width as number, height as number)} stroke="none" fill={fill} />;
}
