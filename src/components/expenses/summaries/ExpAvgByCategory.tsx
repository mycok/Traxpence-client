import React from 'react';

import { Typography, Paper, Chip } from '@material-ui/core';
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            width: 600,
            margin: "60px 10px 10px"
        },
        categoryHeaderContainer: {
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginRight: 20,
            marginTop: 10,
            marginBottom: 10
        },
        headersContainer: {
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            backgroundColor: grey[600]
        },
        valuesContainer: {
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            textAlign: "center"
        },
        paper: {
            marginBottom: 10
        },
        aggHeaders: {
            padding: 10
        },
        headerText: {
            fontWeight: 900
        },
        text: {
            fontSize: 18,
            color: theme.palette.primary.main
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
        <Paper elevation={4} className={classes.paper}>
            <div className={classes.categoryHeaderContainer}>
                <Chip
                    variant="outlined"
                    color="secondary"
                    size="small"
                    label={category?.title}
                />
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
