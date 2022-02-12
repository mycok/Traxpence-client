import React from 'react';
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router-dom';

import {
  Card, CardHeader, CardContent, IconButton, Typography, Chip, Box,
} from '@material-ui/core';
import AccBalanceWallet from '@material-ui/icons/AccountBalanceWalletSharp';
import { EditSharp, DeleteSharp } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { format } from 'date-fns';

import { useAppDispatch } from '../../redux/store';
import { resetStateToSelectedExpenseValues } from '../../redux/reducers/expenses/editExpense';
import { IExpense } from './IExpense';
import CustomTooltip from '../../shared/CustomTooltip';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    width: 650,
    margin: 5,
  },
  editButton: {
    marginLeft: 10,
    color: theme.palette.common.white,
  },
  deleteButton: {
    color: theme.palette.error.main,
  },
  cardContent: {
    marginLeft: 50,
    marginRight: 50,
    color: theme.palette.grey[400],
  },
  categoryLabel: {
    marginRight: 15,
    fontWeight: 900,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  incurredOn: {
    fontWeight: 'bolder',
    fontFamily: 'Roboto Mono',
    fontSize: '14px',
    color: theme.palette.common.white,
  },
  customFieldTypographyContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typographyValues: {
    fontSize: '16px',
    color: theme.palette.common.white,
  },
  avatarIcon: {
    color: theme.palette.common.white,
  },
}));

type ExpenseComponentProps = {
  expense: IExpense,
  handleOpen(): void
}

type CustomFieldTypographyProps = {
  value: string,
  classes: any,
}

function capitalizeString(txt: string) {
  return txt.charAt(0).toUpperCase() + txt.slice(1);
}

function CustomFieldTypography({ value, classes }: CustomFieldTypographyProps) {
  return (
    <Box className={classes.customFieldTypographyContainer}>
      <Typography className={classes.typographyValues}>
        {capitalizeString(value)}
      </Typography>
    </Box>
  );
}

function SingleExpense({ expense, handleOpen }: ExpenseComponentProps) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [currency] = React.useState(localStorage.getItem('currency') ?? '');

  function handleEditButtonClick() {
    dispatch(resetStateToSelectedExpenseValues(
      {
        expenseToEdit: { ...expense },
        editedExpense: undefined,
        didFinishEditingExpense: false,
        isSaving: false,
        serverError: undefined,
      },
    ));
    history.push('/edit-expense');
  }

  return (
    <>
      <Card className={classes.root} elevation={5}>
        <CardHeader
          avatar={
            <AccBalanceWallet fontSize="large" className={classes.avatarIcon} />
          }
          title={(
            <Box className={classes.titleContainer}>
              <CustomFieldTypography
                value={expense?.title}
                classes={classes}
              />
              <Chip
                variant="outlined"
                color="secondary"
                size="small"
                label={expense?.category?.title}
              />
            </Box>
          )}
          subheader={(
            <>
              <Typography
                color="primary"
              >
                <NumberFormat
                  value={expense?.amount ?? 0.0}
                  displayType="text"
                  thousandSeparator
                  prefix={`${currency} ` ?? '$ '}
                />
              </Typography>
              <Typography className={classes.incurredOn} variant="caption">
                {format(new Date(expense.incurredOn), 'dd/MM/yyyy')}
              </Typography>
            </>
          )}
          action={(
            <>
              <CustomTooltip title="Edit" placement="bottom">
                <IconButton
                  aria-label="edit"
                  className={classes.editButton}
                  onClick={handleEditButtonClick}
                >
                  <EditSharp />
                </IconButton>
              </CustomTooltip>

              <CustomTooltip title="Delete" placement="bottom">
                <IconButton
                  aria-label="delete"
                  className={classes.deleteButton}
                  onClick={handleOpen}
                >
                  <DeleteSharp />
                </IconButton>
              </CustomTooltip>
            </>
          )}
        />
        {
          expense?.notes && (
            <CardContent className={classes.cardContent}>
              <Typography>{capitalizeString(expense?.notes)}</Typography>
            </CardContent>
          )
        }
      </Card>
    </>
  );
}

export default SingleExpense;
