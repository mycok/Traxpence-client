import React from "react";

import ExpenseList from './ExpenseList';
import DateRangeSearch from './DateRangeSearch';
import NoExpenses from "./NoExpenses";
import ConfirmDialog from '../../shared/ConfirmDialog';

export interface IExpense {
    _id?: string;
    title: string;
    amount: number;
    category: {
        _id: string,
        title: string,
    };
    notes?: string;
    incurredOn: any
}

const expenseList: IExpense[] = [
    {
        _id: "54605",
        title: "Lunch with john doe",
        amount: 50000,
        category: {
            _id: "53638",
            title: "Meals",
        },
        notes: "This was un planned for and expensive lunch and if it wasn't the fact that i had the money, i wouldn't have spent that much.",
        incurredOn: new Date().toDateString()
    },
    {
        _id: "54604",
        title: "Yaka",
        amount: 30000,
        category: {
            _id: "42351",
            title: "Utilities",
        },
        notes: "",
        incurredOn: new Date().toDateString()
    },
    {
        _id: "67518",
        title: "Hair Cut",
        amount: 5000,
        category: {
            _id: "09877",
            title: "Personal Care",
        },
        notes: "",
        incurredOn: new Date().toDateString()
    }
]

export default function () {
    const [expenses] = React.useState(expenseList);
    const [open, setOpen] = React.useState(false);

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }
    
    function handleDelete () {

    }

    if (expenses.length === 0) {
        return (
            <NoExpenses />
        )
    }

    return (
        <div>
            <ConfirmDialog
                open={open}
                handleClose={handleClose}
                handleDelete={handleDelete}
            />
            <DateRangeSearch />
            <ExpenseList
                expenses={expenses}
                handleOpen={handleOpen}
              />
        </div>
    )
}