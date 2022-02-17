import React from 'react';
import {
  RadialBarChart, RadialBar, Legend, ResponsiveContainer,
  Cell,
} from 'recharts';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper, Box } from '@material-ui/core';

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

const chartLegendStyle = {
  bottom: 0,
  left: '16px',
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};

const data = [
  {
    name: 'Food',
    x: 7,
    y: 34,
  },
  {
    name: 'Utilities',
    x: 11,
    y: 25,
  },
  {
    name: 'Housing',
    x: 1,
    y: 0,
  },
  {
    name: 'Entertainment',
    x: 3,
    y: 1000,
  },
];

function RadialBarGraph() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="120%" barSize={10} data={data}>
            <RadialBar
            //   label={{ position: 'insideStart', fill: '#fff' }}
              background
              dataKey="x"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${entry.x}`} fill={colors[index % colors.length]} />
              ))}
            </RadialBar>
            <Legend
              iconSize={15}
              layout="vertical"
              verticalAlign="bottom"
              wrapperStyle={chartLegendStyle}
              fill="#fff"
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}

export default RadialBarGraph;
