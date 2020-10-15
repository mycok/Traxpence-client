import React from 'react';
import { VictoryChart, VictoryScatter, VictoryTheme, VictoryLabel, VictoryTooltip } from 'victory';
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Paper } from '@material-ui/core';

import DateRange from './DateRange';


const data = [
    {
        "x": 10,
        "y": 34
    },
    {
        "x": 11,
        "y": 25
    },
    {
        "x": 12,
        "y": 0
    },
    {
        "x": 20,
        "y": 1000
    }
]

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly"
        },
        paper: {
            backgroundColor: "#fff"
        }
    })
)

function MonthlyExpScatterPlot() {
    const classes = useStyles();
    const [plotData] = React.useState(data);
    const [selectedDate, selectDate] = React.useState(new Date());

    return (
        <div className={classes.root}>
            <DateRange
                selectedDate={selectedDate}
                selectDate={selectDate}
            />
            <Paper elevation={5} className={classes.paper}>
            <VictoryChart
                    theme={VictoryTheme.grayscale}
                    height={300}
                    width={350}
                    domainPadding={30}
                    style={{ parent: { width: 650, height: 650 }}}
                >
                    <VictoryScatter
                        style={{
                            data: { fill: "orange", stroke: "#c43a31", strokeWidth: 1 },
                            labels: { fill: "#01579b", fontSize: 10, padding: 2 }
                        }}
                        bubbleProperty="y"
                        maxBubbleSize={7}
                        minBubbleSize={1}
                        labels={({ datum }) => `$ ${datum.y} on ${datum.x}th`}
                        labelComponent={<VictoryTooltip />}
                        data={plotData}
                        domain={{ x: [0, 31] }}
                    />
                    <VictoryLabel
                        textAnchor="middle"
                        style={{ fontSize: 10, fill: '#8b8b8b' }}
                        x={310}
                        y={290}
                        text="Day of month"
                    />
                    <VictoryLabel
                        textAnchor="middle"
                        style={{ fontSize: 10, fill: '#8b8b8b' }}
                        x={28}
                        y={40}
                        text="Amount $"
                    />
                </VictoryChart>
            </Paper>
        </div>
    )
}

export default MonthlyExpScatterPlot;