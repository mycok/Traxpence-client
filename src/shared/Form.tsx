import React from 'react';
import { TextField, Paper, Button } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& label.Mui-focused': {
                color: theme.palette.secondary.main,
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: theme.palette.primary.main,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.primary.main,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.secondary.main,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.secondary.main,
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
            margin: 10
        }
    })
)

type FormProps = {
    fields: number,
    handler(event: React.FormEvent<HTMLFormElement>): void | undefined,
}

function Form({ fields, handler }: FormProps) {
    const classes = useStyles();

    return (
        <form
            className={classes.root}
            noValidate autoComplete="off"
            onSubmit={handler}
        >
            <Paper elevation={5} className={classes.textFieldsPaper}>
                {
                    fields === 3 && (
                        <TextField
                            id="username"
                            className={classes.textField}
                            variant="outlined"
                            label="Username"
                        />
                    )
                }

                <TextField
                    id="email"
                    variant="outlined"
                    className={classes.textField}
                    label="Email"
                />
                <TextField
                    id="password"
                    type="password"
                    variant="outlined"
                    className={classes.textField}
                    label="Password"
                />
                <Button
                    variant="contained"
                    fullWidth
                    color="secondary"
                    type="submit"
                    className={classes.submitButton}
                >
                    {fields === 3 ? "Sign Up" : "Sign In"}
                </Button>
            </Paper>
        </form>
    )
}

export default Form;