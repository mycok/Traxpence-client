import React from 'react';
import { VictoryChart, VictoryScatter, VictoryTheme, VictoryLabel, VictoryTooltip } from 'victory';

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

type MonthlyExpScatterPlotProps = {
    charts: string[],
    selectedChart: string,
    selectChart(event: React.ChangeEvent<HTMLInputElement>): void
}

function MonthlyExpScatterPlot({ charts, selectedChart, selectChart }: MonthlyExpScatterPlotProps) {
    const [plotData] = React.useState(data);

    return (
        <div>
            <DateRange
                charts={charts}
                selectedChart={selectedChart}
                selectChart={selectChart}
            />
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
                        x={320}
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
        </div>
    )
}

export default MonthlyExpScatterPlot;