import React from "react";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%"
        },
        textField: {
            width: 300
        },
    })
);

type SingleDateRangeProps = {
    views: any[],
    selectedDate: Date,
    selectDate(date: any, value?: any): void
}

function DateRange({ views, selectedDate, selectDate }: SingleDateRangeProps) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableFuture
                    autoFocus
                    autoOk
                    views={views}
                    inputVariant="outlined"
                    label="Select Date"
                    variant="inline"
                    value={selectedDate}
                    onChange={selectDate}
                />
            </MuiPickersUtilsProvider>
        </div>
    )
}

export default DateRange;