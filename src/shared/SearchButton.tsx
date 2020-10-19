import React from 'react';

import { Fab } from '@material-ui/core';
import SearchSharp from '@material-ui/icons/SearchSharp';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import CustomTooltip from './CustomTooltip';

const useStyles = makeStyles((theme) => createStyles({
  searchButton: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));

function SearchButton() {
  const classes = useStyles();

  return (
    <div>
      <CustomTooltip title="Search" placement="bottom">
        <Fab
          aria-label="search"
          className={classes.searchButton}
          size="small"
          onClick={() => null}
        >
          <SearchSharp fontSize="small" />
        </Fab>
      </CustomTooltip>
    </div>
  );
}

export default SearchButton;
