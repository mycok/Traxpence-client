import React from 'react';
import { VictoryChart, VictoryAxis, VictoryTheme, VictoryBar } from 'victory';
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Paper } from '@material-ui/core';

import DateRange from './DateRange';


const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const yData = [
    {
        "x": 1,
        "y": 34
    },
    {
        "x": 2,
        "y": 25
    },
    {
        "x": 3,
        "y": 0
    },
    {
        "x": 4,
        "y": 1000
    },
    {
        "x": 5,
        "y": 1200
    },
    {
        "x": 6,
        "y": 4000
    },
    {
        "x": 7,
        "y": 678
    },
    {
        "x": 8,
        "y": 7890
    },
    {
        "x": 9,
        "y": 3330
    },
    {
        "x": 10,
        "y": 222
    },
    {
        "x": 11,
        "y": 34
    },
    {
        "x": 12,
        "y": 3000
    }
];

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly"
        }
    })
)

function AnnualTotalExpByMonth() {
    const classes = useStyles();
    const [data] = React.useState(months);
    const [selectedDate, selectDate] = React.useState(new Date());

    return (
        <div className={classes.root}>
            <DateRange
                views={["year"]}
                selectedDate={selectedDate}
                selectDate={selectDate}
            />
            <Paper elevation={0}>
                <VictoryChart
                    theme={VictoryTheme.grayscale}
                    height={600}
                    width={850}
                    domainPadding={10}
                    style={{ parent: { width: 850 } }}
                >
                    <VictoryAxis />
                    <VictoryBar
                        categories={{ x: data }}
                        style={{ data: { fill: "#66bb6a", width: 50 }, labels: { fill: "#ffa500" } }}
                        data={yData}
                        x={data["x"]}
                        domain={{ x: [0, 13] }}
                        labels={({ datum }) => `$ ${datum.y}`}
                    />
                </VictoryChart>
            </Paper>
        </div>
    )
}

export default AnnualTotalExpByMonth;