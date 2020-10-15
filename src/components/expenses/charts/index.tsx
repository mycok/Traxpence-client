import React from 'react';
import { makeStyles, createStyles } from "@material-ui/core/styles";

import MonthlyExpScatterPlot from './ScatterPlot';

const charts = ["Scatter Plot", "Bar", "Pie"];

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column"
        }
    })
)

function Charts() {
    const classes = useStyles();
    const [selectedChart, setChart] = React.useState(charts[0]);

    function selectChart(event: React.ChangeEvent<HTMLInputElement>) {
        setChart(event.target.value);
    }

    if (selectedChart === 'Bar') {
        return <p>Bar Chart Selected</p>
    }

    if (selectedChart === 'Pie') {
        return <p>Pie Chart Selected</p>
    }

    return (
        <div className={classes.root}>
            <MonthlyExpScatterPlot
                charts={charts}
                selectedChart={selectedChart}
                selectChart={selectChart}
            />
        </div>
    )
}

export default Charts;