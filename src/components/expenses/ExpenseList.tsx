/* eslint-disable no-unused-vars */
import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Button, Box } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

import { IExpense } from './IExpense';
import SingleExpense from './SingleExpense';
import CircularLoader from '../../shared/CircularLoader';

const useStyles = makeStyles(() => createStyles({
  root: {
    position: 'relative',
    paddingTop: 5,
    paddingBottom: 5,
    height: '90vh',
    overflowY: 'auto',
  },
  showMoreButton: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonProgress: {
    position: 'absolute',
    color: green[500],
    marginLeft: 320,
    padding: 2,
  },
}));

type ExpenseListProps = {
  isLoading: boolean,
  expenses: IExpense[],
  hasMore: boolean,
  handleOpen(exp: IExpense): void,
  handleShowMore(): void,
};

function ExpenseList({
  isLoading,
  expenses,
  hasMore,
  handleOpen,
  handleShowMore,
}: ExpenseListProps) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {expenses?.map((exp) => (
        <SingleExpense
          key={exp?._id}
          expense={exp}
          handleOpen={() => handleOpen(exp)}
        />
      ))}
      {
        hasMore && (
          isLoading ? (
            <CircularLoader styleClass={classes.buttonProgress} />
          ) : (
            <Button
              className={classes.showMoreButton}
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleShowMore}
            >
              show more
            </Button>
          )
        )
      }
    </Box>
  );
}

export default ExpenseList;
