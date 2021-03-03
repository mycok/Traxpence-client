import React from 'react';

import { Fab } from '@material-ui/core';
import SearchSharp from '@material-ui/icons/SearchSharp';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import CustomTooltip from './CustomTooltip';
import CircularLoader from './CircularLoader';

const useStyles = makeStyles((theme) => createStyles({
  searchButton: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  buttonProgress: {
    display: 'flex',
    justifyContent: 'center',
    // position: 'absolute',
    color: green[500],
    // marginLeft: 320,
    padding: 2,
  },
}));

type SearchButtonProps = {
  isLoading: boolean,
  dateRangeSearchHandler(): void
}

function SearchButton({ isLoading, dateRangeSearchHandler }: SearchButtonProps) {
  const classes = useStyles();

  return (
    <div>
      <CustomTooltip title="Search" placement="bottom">
        <Fab
          aria-label="search"
          className={classes.searchButton}
          size="small"
          disabled={isLoading}
          onClick={dateRangeSearchHandler}
        >
          {
            isLoading ? (
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
