import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

import { IExpense } from ".";
import ExpenseForm from "./ExpenseForm";

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }
    })
)

type Action = {
    type: string;
    payload: any;
};

const initialExpenseState = {
    title: "",
    amount: 0,
    category: {
        _id: "",
        title: "",
    },
    notes: "",
    incurredOn: Date.now(),
};

function NewExpense() {
    const classes = useStyles();

    const [state, dispatch] = React.useReducer(
        (state: IExpense, action: Action) => {
            switch (action.type) {
                case "SET_TITTLE":
                    break;

                default:
                    break;
            }
            return state;
        },
        initialExpenseState
    );

    const [prefCurrency] = React.useState(localStorage.getItem("currency"));
    const [selectedCategory, selectCategory] = React.useState("Food");

    function handleDateChange(date: Date | null) {
        return dispatch({ type: "SET_DATE", payload: date });
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        selectCategory(event.target.value);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) { }

    return (
        <div className={classes.container}>
            <Paper elevation={5}>
                <ExpenseForm
                    state={state}
                    prefCurrency={prefCurrency}
                    selectedCategory={selectedCategory}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    handleDateChange={handleDateChange}
                />
            </Paper>
        </div>
    );
}

export default NewExpense;
