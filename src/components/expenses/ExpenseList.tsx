import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { IExpense } from './index';
import SingleExpense from './SingleExpense';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            marginTop: 90
        }
    })
)

type expenses = {
    expenses: IExpense[]
};

function ExpenseList({ expenses }: expenses) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {
                expenses?.map((exp) => <SingleExpense key={exp?._id} expense={exp} />)
            }
        </div>
    )
}

export default ExpenseList;