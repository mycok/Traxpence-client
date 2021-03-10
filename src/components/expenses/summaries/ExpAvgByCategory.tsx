import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import NumberFormat from 'react-number-format';

import { Typography, Paper, Chip } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import { fetchMonthlyCategoryExpenditureAggregate, MonthlyCategoryExpAggregate } from '../../../redux/reducers/expenses/monthlyCategoryExpAgg';
import { useAppDispatch, RootState } from '../../../redux/store';
import { fetchCategories, Category } from '../../../redux/reducers/category/fetchCategories';

import { ExpensesLoader } from '../../../shared/ContentLoader';
import NoExpenses from '../NoExpenses';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 600,
    margin: '70px 10px 10px',
  },
  categoryHeaderContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  headersContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: grey[600],
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
  },
  text: {
    fontSize: 18,
    color: theme.palette.primary.main,
  },
}));

type ExpSummByCategoryProps = {
  classes: any,
  currency: string | null,
  category: {
    _id: string,
    title: string
  }
  expenditureAggData: MonthlyCategoryExpAggregate,
}

function MonthlyExpAvgByCategory() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const currency = localStorage.getItem('currency');

  const { categories } = useSelector((state: RootState) => state.categories);
  const { isLoading, data } = useSelector((state: RootState) => state.expenditureAvgByCategory);

  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
    dispatch(fetchMonthlyCategoryExpenditureAggregate());
  }, [categories, dispatch]);

  if (isLoading) {
    return <ExpensesLoader />;
  }

  if (data.length === 0) {
    return (
      <NoExpenses />
    );
  }

  return (
    <div className={classes.root}>
      {
        data.map((item) => {
          const matchedCategory = categories.find((cat: Category) => cat._id === item._id);
          return (
            <CategoryAvgExpenditure
              key={item._id}
              classes={classes}
              currency={currency}
              category={matchedCategory as Category}
              expenditureAggData={item}
            />
          );
        })
      }
    </div>
  );
}

function CategoryAvgExpenditure({
  classes,
  category,
  currency,
  expenditureAggData,
}: ExpSummByCategoryProps) {
  return (
    <Paper elevation={4} className={classes.paper}>
      <div className={classes.categoryHeaderContainer}>
        <Chip
          variant="outlined"
          color="secondary"
          size="small"
          label={category?.title}
        />
      </div>
      <div className={classes.headersContainer}>
        <div className={classes.aggHeaders}>
          <Typography className={classes.headerText}>Past Average</Typography>
        </div>
        <div className={classes.aggHeaders}>
          <Typography className={classes.headerText}>Current Month Total</Typography>
        </div>
        <div className={classes.aggHeaders}>
          <Typography
            className={classes.headerText}
          >
            {expenditureAggData.mergedValues.total
             && (expenditureAggData.mergedValues.total - expenditureAggData.mergedValues.average) > 0 ? 'Spent Extra' : 'Saved' }
          </Typography>
        </div>
      </div>

      <div className={classes.valuesContainer}>
        <div className={classes.aggHeaders}>
          <Typography
            align="center"
            className={classes.text}
          >
            <NumberFormat
              value={Math.round(expenditureAggData.mergedValues.average)}
              displayType="text"
              thousandSeparator
              prefix={`${currency} ` ?? '$ '}
            />
          </Typography>
        </div>
        <div className={classes.aggHeaders}>
          <Typography
            align="center"
            className={classes.text}
          >
            <NumberFormat
              value={Math.round(expenditureAggData.mergedValues.total as number ?? 0.0)}
              displayType="text"
              thousandSeparator
              prefix={`${currency} ` ?? '$ '}
            />
          </Typography>
        </div>
        <div className={classes.aggHeaders}>
          <Typography
            align="center"
            className={classes.text}
          >
            <NumberFormat
              value={
          expenditureAggData.mergedValues?.total
            ? Math.round(Math.abs(
              expenditureAggData.mergedValues.total - expenditureAggData.mergedValues.average,
            ))
            : Math.round(expenditureAggData.mergedValues.average)
        }
              displayType="text"
              thousandSeparator
              prefix={`${currency} ` ?? '$ '}
            />
          </Typography>
        </div>
      </div>
    </Paper>
  );
}

export default MonthlyExpAvgByCategory;
