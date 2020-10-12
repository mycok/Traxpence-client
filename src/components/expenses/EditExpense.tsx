import React from "react";

import { IExpense } from ".";
import ExpenseForm from "./ExpenseForm";

type Action = {
    type: string;
    payload: any;
};

function EditExpense({ location }) {
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
        location?.state
    );

    const [prefCurrency] = React.useState(localStorage.getItem("currency"));
    const [selectedCategory, selectCategory] = React.useState(state?.category?.title);

    function handleDateChange(date: Date | null) {
        return dispatch({ type: "SET_DATE", payload: date });
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        selectCategory(event.target.value);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) { }

    return (
        <ExpenseForm
            state={state}
            prefCurrency={prefCurrency}
            selectedCategory={selectedCategory}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
        />
    );
}

export default EditExpense;
