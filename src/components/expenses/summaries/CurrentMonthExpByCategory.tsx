import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import NumberFormat from 'react-number-format';

import {
  Typography, Paper, Chip, Box,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import {
  fetchCurrentMonthAvgTotalExpenditureByCategory,
  CurrentMonthAvgTotalExpByCategory,
} from '../../../redux/reducers/expenses/currentMonthExpByCategory';
import { useAppDispatch, RootState } from '../../../redux/store';
import {
  fetchCategories,
  Category,
} from '../../../redux/reducers/category/fetchCategories';

import { ExpensesLoader } from '../../../shared/ContentLoader';
import NoExpenses from '../NoExpenses';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 600,
    marginTop: 10,
  },
  categoryHeaderContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    padding: theme.spacing(1),
  },
  headersContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: grey[300],
  },
  valuesContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
  },
  paper: {
    marginBottom: 10,
  },
  aggHeaders: {
    padding: 10,
  },
  headerText: {
    fontWeight: 900,
    color: '#000000de',
    fontFamily: 'Roboto Mono',
  },
  text: {
    fontSize: 18,
    color: theme.palette.primary.main,
    fontFamily: 'Roboto Mono',
  },
}));

type CategoryAvgAndTotalExpenditureProps = {
  classes: any;
  currency: string | null;
  category: {
    _id: string;
    title: string;
  };
  currentMonthAvgAndTotalExpByCategory: CurrentMonthAvgTotalExpByCategory;
};

function CurrentMonthAvgAndTotalExpByCategory() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const currency = localStorage.getItem('currency');

  const { categories } = useSelector((state: RootState) => state.categories);
  const { isLoading, currentMonthAvgTotalExpByCategory } = useSelector(
    (state: RootState) => state.currentMonthAvgTotalExpByCategory,
  );

  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
    dispatch(fetchCurrentMonthAvgTotalExpenditureByCategory());
  }, [categories, dispatch]);

  if (isLoading) {
    return <ExpensesLoader />;
  }

  if (currentMonthAvgTotalExpByCategory.length === 0) {
    return <NoExpenses />;
  }

  return (
    <Box className={classes.root}>
      {currentMonthAvgTotalExpByCategory.map((expenditureAgg) => {
        const matchedCategory = categories.find(
          (cat: Category) => cat._id === expenditureAgg._id,
        );
        return (
          <CategoryTotalAndAvgExpenditure
            key={expenditureAgg._id}
            classes={classes}
            currency={currency}
            category={matchedCategory as Category}
            currentMonthAvgAndTotalExpByCategory={expenditureAgg}
          />
        );
      })}
    </Box>
  );
}

function CategoryTotalAndAvgExpenditure({
  classes,
  category,
  currency,
  currentMonthAvgAndTotalExpByCategory,
}: CategoryAvgAndTotalExpenditureProps) {
  return (
    <Paper elevation={4} className={classes.paper}>
      <Box className={classes.categoryHeaderContainer}>
        <Chip
          variant="outlined"
          color="secondary"
          size="small"
          label={category?.title}
        />
      </Box>
      <Box className={classes.headersContainer}>
        <Box className={classes.aggHeaders}>
          <Typography className={classes.headerText}>Past Average</Typography>
        </Box>
        <Box className={classes.aggHeaders}>
          <Typography className={classes.headerText}>
            Current Month Total
          </Typography>
        </Box>
        <Box className={classes.aggHeaders}>
          <Typography className={classes.headerText}>
            {currentMonthAvgAndTotalExpByCategory.mergedValues.total
            && currentMonthAvgAndTotalExpByCategory.mergedValues.total
              - currentMonthAvgAndTotalExpByCategory.mergedValues.average
              > 0
              ? 'Spent Extra'
              : 'Saved'}
          </Typography>
        </Box>
      </Box>

      <Box className={classes.valuesContainer}>
        <Box className={classes.aggHeaders}>
          <Typography align="center" className={classes.text}>
            <NumberFormat
              value={Math.round(currentMonthAvgAndTotalExpByCategory.mergedValues.average)}
              displayType="text"
              thousandSeparator
              prefix={`${currency} ` ?? '$ '}
            />
          </Typography>
        </Box>
        <Box className={classes.aggHeaders}>
          <Typography align="center" className={classes.text}>
            <NumberFormat
              value={Math.round(
                (currentMonthAvgAndTotalExpByCategory.mergedValues.total as number) ?? 0.0,
              )}
              displayType="text"
              thousandSeparator
              prefix={`${currency} ` ?? '$ '}
            />
          </Typography>
        </Box>
        <Box className={classes.aggHeaders}>
          <Typography align="center" className={classes.text}>
            <NumberFormat
              value={
                currentMonthAvgAndTotalExpByCategory.mergedValues?.total
                  ? Math.round(
                    Math.abs(
                      currentMonthAvgAndTotalExpByCategory.mergedValues.total
                          - currentMonthAvgAndTotalExpByCategory.mergedValues.average,
                    ),
                  )
                  : Math.round(currentMonthAvgAndTotalExpByCategory.mergedValues.average)
              }
              displayType="text"
              thousandSeparator
              prefix={`${currency} ` ?? '$ '}
            />
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default CurrentMonthAvgAndTotalExpByCategory;
