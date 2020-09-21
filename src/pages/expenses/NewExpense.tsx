import React from "react";
import { TextField, Paper, Button } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& label.Mui-focused': {
                color: theme.palette.primary.main,
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: theme.palette.primary.main,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.primary.main,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.main,
                },
            },
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
            width: 300,
            margin: 20
        }
    })
)

type NewExpenseProps = {
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

function NewExpense({ handler }: NewExpenseProps) {
    const classes = useStyles();
    const [state, dispatch] = React.useReducer((state: ExpenseState, action: Action) => {
        switch (action.type) {
            case "SET_TITTLE":
                break;

            default:
                break;
        }
        return state;
    }, initialState)

    function onDateChange(date: Date | null) {
        return dispatch({ type: "SET_DATE", payload: date });
    }

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
                        inputComponent: NumberFormatterInput as any
                    }}

                />
                <TextField
                    id="category"
                    variant="outlined"
                    className={classes.textField}
                    label="Category"
                    value={state?.category}
                    required
                />

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
                        showTodayButton
                    />
                </MuiPickersUtilsProvider>
                <Button
                    variant="contained"
                    fullWidth
                    color="secondary"
                    type="submit"
                    className={classes.submitButton}
                >
                    Create
                </Button>
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
            prefix="$"
        />
    );
}

export default NewExpense;