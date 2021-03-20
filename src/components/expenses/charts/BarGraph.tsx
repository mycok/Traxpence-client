import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  VictoryChart, VictoryAxis, VictoryTheme, VictoryBar,
} from 'victory';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import SingleDateRange from '../../../shared/dates/SingleDateRange';
import { ExpensesLoader } from '../../../shared/ContentLoader';

import { useAppDispatch, RootState } from '../../../redux/store';
import { fetchAnnualExpenseData } from '../../../redux/reducers/expenses/annualExpData';

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const useStyles = makeStyles(() => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
}));

function AnnualTotalExpByMonth() {
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

  return (
    <div className={classes.root}>
      <SingleDateRange
        views={['year']}
        selectedDate={selectedDate}
        selectDate={selectDate}
      />
      <Paper elevation={0}>
        <VictoryChart
          theme={VictoryTheme.grayscale}
          height={600}
          width={850}
          domainPadding={10}
          style={{ parent: { width: 850 } }}
        >
          <VictoryAxis />
          <VictoryBar
            categories={{ x: months }}
            style={{ data: { fill: '#66bb6a', width: 50 }, labels: { fill: '#ffa500' } }}
            data={annualExpData}
            domain={{ x: [0, 13] }}
            labels={({ datum }) => `$ ${datum.y}`}
          />
        </VictoryChart>
      </Paper>
    </div>
  );
}

export default AnnualTotalExpByMonth;
