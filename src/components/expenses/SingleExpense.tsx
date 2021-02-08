import React from 'react';
import {
  Card, CardHeader, CardContent, IconButton, Typography, Chip,
} from '@material-ui/core';
import AccBalanceWallet from '@material-ui/icons/AccountBalanceWalletSharp';
import { EditSharp, DeleteSharp } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import { IExpense } from './IExpense';
import CustomTooltip from '../../shared/CustomTooltip';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    width: 650,
    margin: 5,
  },
  editButton: {
    marginLeft: 10,
  },
  deleteButton: {
    color: theme.palette.secondary.main,
  },
  cardContent: {
    marginLeft: 50,
    marginRight: 50,
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
    fontWeight: 'bold',
  },
  customFieldTypographyContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typographyValues: {
    marginLeft: 4,
  },
}));

type ExpenseComponentProps = {
  expense: IExpense,
  handleOpen(): void
}

type CustomFieldTypographyProps = {
  field: string,
  value: string,
  classes: any,
}

function capitalizeString(txt: string) {
  return txt.charAt(0).toUpperCase() + txt.slice(1);
}

function CustomFieldTypography({ field, value, classes }: CustomFieldTypographyProps) {
  return (
    <div className={classes.customFieldTypographyContainer}>
      <Typography variant="subtitle1">{`${field}:`}</Typography>
      <Typography variant="subtitle1" className={classes.typographyValues}>
        {capitalizeString(value)}
      </Typography>
    </div>
  );
}

function SingleExpense({ expense, handleOpen }: ExpenseComponentProps) {
  const classes = useStyles();
  const [currency] = React.useState(localStorage.getItem('currency') ?? '');

  return (
    <>
      <Card className={classes.root} elevation={5}>
        <CardHeader
          avatar={
            <AccBalanceWallet fontSize="large" />
          }
          title={(
            <div className={classes.titleContainer}>
              <>
                <CustomFieldTypography
                  field="Title"
                  value={expense?.title}
                  classes={classes}
                />
                <Chip
                  variant="outlined"
                  color="secondary"
                  size="small"
                  label={expense?.category?.title}
                />
              </>
            </div>
          )}
          subheader={(
            <>
              <Typography color="primary">{`${currency} ${expense?.amount.toString()}`}</Typography>
              <Typography className={classes.incurredOn} variant="caption">
                {format(new Date(expense.incurredOn), 'dd/mm/yyyy')}
              </Typography>
            </>
          )}
          action={(
            <>
              <Link to={{
                pathname: '/edit-expense',
                state: expense,
              }}
              >
                <CustomTooltip title="Edit" placement="bottom">
                  <IconButton aria-label="edit" className={classes.editButton}>
                    <EditSharp />
                  </IconButton>
                </CustomTooltip>
              </Link>
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
