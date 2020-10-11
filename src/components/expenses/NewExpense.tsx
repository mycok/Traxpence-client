import React from "react";
import { TextField, Paper, Button, MenuItem, InputAdornment } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            "& label.Mui-focused": {
                color: theme.palette.primary.main,
            },
            "& .MuiInput-underline:after": {
                borderBottomColor: theme.palette.primary.main,
            },
            "& .MuiOutlinedInput-root": {
                "& fieldset": {
                    borderColor: theme.palette.primary.main,
                },
                "&:hover fieldset": {
                    borderColor: theme.palette.primary.main,
                },
                "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                },
            },
            display: "flex",
            alignItems: "center"
        },
        container: {
            border: "1px solid #fff",
            margin: 0,
            width: 500
        },
        textFieldsPaper: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: 500,
            height: 500
        },
        textField: {
            margin: 10,
            width: 400
        },
        submitButton: {
            width: 180,
            margin: 20
        },
        deleteButton: {
            width: 180,
            margin: 20,
            color: "#fff",
            backgroundColor: red[900]
        }
    })
)

type NewExpenseComponentProps = {
    handler(event: React.FormEvent<HTMLFormElement>): void | undefined,
}

type ExpenseState = {
    title: string,
    amount: string,
    category: string,
    incurredOn: any,
    notes: string,
}

type Action = {
    type: string,
    payload: any
}

const initialState = {
    title: "",
    amount: "152000000",
    category: "",
    incurredOn: Date.now(),
    notes: ""
}

const categoryList = [
    { _id: 1, title: "Entertainment" },
    { _id: 2, title: "Food" },
    { _id: 3, title: "Utilities" },
    { _id: 4, title: "Car" },
]

function NewExpense({ handler }: NewExpenseComponentProps) {
    const classes = useStyles();
    const isEditing = false;
    const [state, dispatch] = React.useReducer((state: ExpenseState, action: Action) => {
        switch (action.type) {
            case "SET_TITTLE":
                break;

            default:
                break;
        }
        return state;
    }, initialState)

    const [prefCurrency] = React.useState(localStorage.getItem("currency"));
    const [selectedCategory, selectCategory] = React.useState("Food");

    function onDateChange(date: Date | null) {
        return dispatch({ type: "SET_DATE", payload: date });
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        selectCategory(event.target.value);
    };

    return (
        <form
            className={classes.root}
            noValidate autoComplete="off"
            onSubmit={handler}
        >
            <Paper elevation={5} className={classes.textFieldsPaper}>
                <TextField
                    id="title"
                    className={classes.textField}
                    variant="outlined"
                    label="Title"
                    value={state?.title}
                    required
                />

                <TextField
                    id="amount"
                    variant="outlined"
                    className={classes.textField}
                    label="Amount"
                    value={state?.amount}
                    required
                    InputProps={{
                        inputComponent: NumberFormatterInput as any,
                        startAdornment: <InputAdornment position="start">{prefCurrency}</InputAdornment>
                        
                    }}

                />
                <TextField
                    id="category"
                    variant="outlined"
                    className={classes.textField}
                    label="Category"
                    value={selectedCategory}
                    required
                    select
                    onChange={handleChange}
                >
                    {
                        categoryList.map((cat) => <MenuItem key={cat?._id} value={cat?.title}>{cat?.title}</MenuItem>)
                    }
                </TextField>

                <TextField
                    id="notes"
                    variant="outlined"
                    className={classes.textField}
                    label="Add a note"
                    value={state?.notes}
                    multiline
                    rowsMax={4}
                />

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                        className={classes.textField}
                        label="Incurred On"
                        views={["year", "month", "date"]}
                        value={new Date()}
                        onChange={onDateChange}
                        variant="inline"
                        inputVariant="outlined"
                        format="yyyy/MM/dd hh:mm a"
                        PopoverProps={{
                            anchorReference: "anchorPosition",
                            anchorPosition: {
                                top: 500,
                                left: 650

                            },
                            anchorOrigin: {
                                vertical: "center",
                                horizontal: "right",
                            },
                            transformOrigin: {
                                vertical: "top",
                                horizontal: "right",
                            }
                        }}
                    />
                </MuiPickersUtilsProvider>
                <div>
                    <Button
                        variant="contained"
                        fullWidth
                        color="secondary"
                        type="submit"
                        className={classes.submitButton}
                    >
                        Create
                </Button>
                    {
                        isEditing && (
                            <Button
                                variant="contained"
                                fullWidth
                                type="submit"
                                className={classes.deleteButton}
                            >
                                Delete
                            </Button>
                        )
                    }

                </div>
            </Paper>
        </form>
    )
}

type NumberFormatProps = {
    inputRef: (instance: NumberFormat | null) => void,
    onChange: (event: { target: { name: string; value: string } }) => void,
    name: string
}

function NumberFormatterInput(props: NumberFormatProps) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
        />
    );
}

export default NewExpense;