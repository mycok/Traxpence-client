import React from 'react';

import { Typography, Paper } from '@material-ui/core';
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            width: 800,
            height: 160,
            margin: 10
        },
        categoryHeaderContainer: {
            display: "flex",
            justifyContent: "center",
            width: "100%",
            margin: 10
        },
        headersContainer: {
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            backgroundColor: grey[700],
            borderTop: `2px solid ${theme.palette.primary.main}`,
            borderBottom: `2px solid ${theme.palette.primary.main}`
        },
        valuesContainer: {
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            textAlign: "center"
        },
        aggHeaders: {
            padding: 10
        },
        headerText: {
            fontWeight: 900
        },
        text: {
            fontSize: 18,
        }
    })
)

type ExpSummByCategory = {
    classes: any,
    category: {
        _id: string,
        title: string
    }
}

const categories = [
    { _id: "34567", title: "Groceries" },
    { _id: "67345", title: "Misc" },
    { _id: "45636", title: "Utilities" },
    { _id: "98780", title: "Entertainment" }
];

function ExpAvgByCategory() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {
                categories.map((cat) => (
                    <Category
                        key={cat._id}
                        classes={classes}
                        category={cat}
                    />
                ))
            }
        </div>
    )
}

function Category({ classes, category }: ExpSummByCategory) {
    return (
        <Paper elevation={0}>
            <div className={classes.categoryHeaderContainer}>
                <Typography variant="h6" className={classes.headerText}>{category.title}</Typography>
            </div>
            <div className={classes.headersContainer}>
                <div className={classes.aggHeaders}>
                    <Typography className={classes.headerText}>Past Average</Typography>
                </div>
                <div className={classes.aggHeaders}>
                    <Typography className={classes.headerText}>Current Average</Typography>
                </div>
                <div className={classes.aggHeaders}>
                    <Typography className={classes.headerText}>Extra / Saved</Typography>
                </div>
            </div>

            <div className={classes.valuesContainer}>
                <div className={classes.aggHeaders}>
                    <Typography align="center" className={classes.text}>$ 0.0</Typography>
                </div>
                <div className={classes.aggHeaders}>
                    <Typography align="center" className={classes.text}>$ 0.0</Typography>
                </div>
                <div className={classes.aggHeaders}>
                    <Typography align="center" className={classes.text}>$ 0.0</Typography>
                </div>
            </div>
        </Paper>
    )
}

export default ExpAvgByCategory;
