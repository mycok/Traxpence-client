import React from 'react';

import { Fab } from '@material-ui/core';
import SearchSharp from '@material-ui/icons/SearchSharp';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import CustomTooltip from './CustomTooltip';
import CircularLoader from './CircularLoader';

const useStyles = makeStyles((theme) => createStyles({
  searchButton: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  buttonProgress: {
    display: 'flex',
    justifyContent: 'center',
    color: green[500],
    padding: 2,
  },
}));

type SearchButtonProps = {
  isLoading: boolean,
  isBackButtonShown: boolean,
  dateRangeSearchHandler(): void
}

function SearchButton({
  isLoading,
  isBackButtonShown,
  dateRangeSearchHandler,
}: SearchButtonProps) {
  const classes = useStyles();

  return (
    <div>
      <CustomTooltip title="Search" placement="bottom">
        <Fab
          aria-label="search"
          className={classes.searchButton}
          size="small"
          disabled={isLoading && isBackButtonShown}
          onClick={dateRangeSearchHandler}
        >
          {
            isLoading && isBackButtonShown ? (
              <CircularLoader styleClass={classes.buttonProgress} />
            ) : (
              <SearchSharp fontSize="small" />
            )
          }
        </Fab>
      </CustomTooltip>
    </div>
  );
}

export default SearchButton;
