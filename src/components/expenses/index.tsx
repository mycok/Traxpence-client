import React from "react";

import ExpenseList from './ExpenseList';
import DateRangeSearch from './DateRangeSearch';
import NoExpenses from "./NoExpenses";

export interface IExpense {
    _id: string,
    name: string,
    amount: number,
    category: {
        _id: string,
        title: string,
    },
    notes?: string,
    incurredOn: any
}

const expenseList = [
    {
        _id: "54605",
        name: "Lunch with olive",
        amount: 50000,
        category: {
            _id: "87908",
            title: "Meals",
        },
        notes: "This was un planned for and expensive lunch and if it wasn't the fact that she is somewhat special, i wouldn't have spent that much.",
        incurredOn: new Date().toDateString()
    },
    {
        _id: "54604",
        name: "Yaka",
        amount: 30000,
        category: {
            _id: "42351",
            title: "Utilities",
        },
        incurredOn: new Date().toDateString()
    },
    {
        _id: "67518",
        name: "Hair Cut",
        amount: 5000,
        category: {
            _id: "09877",
            title: "Personal Care",
        },
        incurredOn: new Date().toDateString()
    }
]

export default function () {
    const [expenses] = React.useState(expenseList);

    if (expenses.length === 0) {
        return (
            <NoExpenses />
        )
    }

    return (
        <div>
            <DateRangeSearch />
            <ExpenseList expenses={expenses} />
        </div>
    )
}