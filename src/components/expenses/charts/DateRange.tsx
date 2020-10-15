import React from "react";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: 20,
            width: "100%"
        },
        text: {
            fontWeight: 700,
            fontSize: 18
        },
        textField: {
            margin: 10,
            width: 400
        },
    })
);

type SingleDateRangeProps = {
    selectedDate: Date,
    selectDate(date: any, value?: any): void
}

function DateRange({ selectedDate, selectDate }: SingleDateRangeProps) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div>
                <Typography
                    align="center"
                    className={classes.text}
                >
                    Expenditure graph over the month of
                </Typography>
            </div>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableFuture
                    autoFocus
                    autoOk
                    views={["month", "year"]}
                    inputVariant="standard"
                    variant="inline"
                    value={selectedDate}
                    onChange={selectDate}
                />
            </MuiPickersUtilsProvider>
        </div>
    )
}

export default DateRange;