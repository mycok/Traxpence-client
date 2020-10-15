import React from "react";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography, TextField, MenuItem } from '@material-ui/core';

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

type DateRangeProps = {
    charts: string[],
    selectedChart: string,
    selectChart(event: React.ChangeEvent<HTMLInputElement>): void
}

function DateRange({ charts, selectedChart, selectChart }: DateRangeProps) {
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
            <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableFuture
                    format="MM/yyyy"
                    autoFocus
                    views={["month"]}
                    inputVariant="standard"
                    variant="inline"
                    value={Date.now()}
                    onChange={() => null}
                />
            </MuiPickersUtilsProvider>
            <TextField
                    id="chart"
                    variant="standard"
                    className={classes.textField}
                    value={selectedChart}
                    required
                    select
                    onChange={selectChart}
                >
                    {
                        charts.map((chart) => <MenuItem key={chart} value={chart}>{chart}</MenuItem>)
                    }
                </TextField>
            </>
        </div>
    )
}

export default DateRange;