import React from "react";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Fab } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { SearchSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: "flex",
            justifyContent: "space-between",
            margin: 20,
            width: "100%"
        },
        addButton: {
            color: theme.palette.common.black,
            backgroundColor: theme.palette.secondary.main,
            '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
            },
        }
    })
);


function DateRangeSearch() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableFuture
                    format="dd/MM/yyyy"
                    label="Show Records From:"
                    autoFocus
                    views={["year", "month", "date"]}
                    inputVariant="outlined"
                    variant="inline"
                    value={new Date()}
                    onChange={() => null}
                />
                <KeyboardDatePicker
                    disableFuture
                    format="dd/MM/yyyy"
                    label="To:"
                    views={["year", "month", "date"]}
                    inputVariant="outlined"
                    variant="inline"
                    value={new Date()}
                    onChange={() => null}
                />
            </MuiPickersUtilsProvider>
            <div>
                <Fab
                    aria-label="add new expense"
                    className={classes.addButton}
                    size="small"
                    onClick={() => null}
                >
                    <SearchSharp fontSize="small" />
                </Fab>
            </div>
        </div>
    )
}

export default DateRangeSearch;