import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  BarChart, Bar, XAxis, YAxis,
  ResponsiveContainer, LabelList,
} from 'recharts';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper, Box } from '@material-ui/core';

import SingleDateRange from '../../../shared/dates/SingleDateRange';
import { ExpensesLoader } from '../../../shared/ContentLoader';

import { useAppDispatch, RootState } from '../../../redux/store';
import { fetchAnnualExpenseData } from '../../../redux/reducers/expenses/annualExpData';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '630px',
    height: '360px',
    paddingTop: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(1),
    width: '100%',
    height: '100%',
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
    <Box className={classes.root}>
      <SingleDateRange
        views={['year']}
        selectedDate={selectedDate}
        selectDate={selectDate}
      />
      <Paper elevation={0} className={classes.paper}>
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
            <XAxis dataKey="m">
              <LabelList dataKey="m" />
            </XAxis>
            <YAxis dataKey="y" />
            <Bar dataKey="y" fill="#0da86c" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}

export default AnnualTotalExpByMonth;
