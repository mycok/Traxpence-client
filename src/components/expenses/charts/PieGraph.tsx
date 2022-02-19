import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  PieChart, Pie, ResponsiveContainer,
  Sector, Cell,
} from 'recharts';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper, Box } from '@material-ui/core';

import { colors } from '../../../theme';
import {
  CurrentMonthAvgTotalExpByCategory,
  fetchCurrentMonthAvgTotalExpenditureByCategory,
} from '../../../redux/reducers/expenses/currentMonthExpByCategory';
import {
  fetchCategories,
  Category,
} from '../../../redux/reducers/category/fetchCategories';
import { useAppDispatch, RootState } from '../../../redux/store';

import { ExpensesLoader } from '../../../shared/ContentLoader';
import NoGraphData from './NoGraphData';

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
  const dispatch = useAppDispatch();

  const [activeIndex, setActiveIndex] = useState(0);
  const [pieGraphData, setPieGraphData] = useState<CurrentMonthAvgTotalExpByCategory[]>([]);
  const { categories } = useSelector((state: RootState) => state.categories);
  const { isLoading, currentMonthAvgTotalExpByCategory } = useSelector(
    (state: RootState) => state.currentMonthAvgTotalExpByCategory,
  );

  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
    dispatch(fetchCurrentMonthAvgTotalExpenditureByCategory());
  }, [categories, dispatch]);

  useEffect(() => {
    if (currentMonthAvgTotalExpByCategory.length !== 0
      && categories.length !== 0
    ) {
      const data = currentMonthAvgTotalExpByCategory
        .map((obj: CurrentMonthAvgTotalExpByCategory) => ({
          ...obj,
          _id: categories.find((cat: Category) => cat._id === obj._id)?.title as string,
        }));

      setPieGraphData(data);
    }
  }, [categories, currentMonthAvgTotalExpByCategory]);

  function onPieEnter(_, index: number) {
    setActiveIndex(index);
  }

  if (isLoading) {
    return (
      <ExpensesLoader />
    );
  }

  if (currentMonthAvgTotalExpByCategory.length === 0) {
    return (
      <NoGraphData />
    );
  }

  return (
    <Box className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={630} height={360}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={pieGraphData}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={120}
              fill="#0da86c"
              dataKey="mergedValues.average"
              onMouseEnter={onPieEnter}
            >
              {pieGraphData.map((entry, index) => (
                <Cell key={`cell-${entry._id}`} fill={colors[index % colors.length]} />
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
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent,
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
        {payload._id}
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
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#fff">{`${currency} ${payload.mergedValues.average}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#33859e">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
