import React, { useState } from 'react';
import {
  PieChart, Pie, ResponsiveContainer,
  Sector, Cell,
} from 'recharts';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper, Box } from '@material-ui/core';
import { colors } from '../../../theme';

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
    width: '630px',
    height: '360px',
  },
  paper: {
    width: '100%',
    height: '100%',
  },
}));

function PieGraph() {
  const classes = useStyles();
  const [activeIndex, setActiveIndex] = useState(0);

  function onPieEnter(_, index: number) {
    setActiveIndex(index);
  }

  return (
    <Box className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={630} height={360}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={120}
              fill="#0da86c"
              dataKey="y"
              onMouseEnter={onPieEnter}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${entry.x}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}

export default PieGraph;

const renderActiveShape = (props: any) => {
  const currency = localStorage.getItem('currency') ?? '$';
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, y,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#fff">
        {payload.x}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#fff">{`${currency} ${y}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#33859e">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
