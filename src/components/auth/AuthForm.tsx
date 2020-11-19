import React from 'react';
import { TextField, Paper, Button } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => createStyles({
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
  textFieldsPaper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textField: {
    margin: 10,
    width: 400,
  },
  submitButton: {
    width: 180,
    margin: 10,
  },
}));

type FormComponentProps = {
  elevation?: number,
  fields: number,
  username?: string,
  email: string,
  password: string,
  handleOnChange(event: any): void,
  handleOnSubmit(event: React.FormEvent<HTMLFormElement>): void,
}

function Form({
  elevation, fields, username, email, password, handleOnChange, handleOnSubmit,
}: FormComponentProps) {
  const classes = useStyles();

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleOnSubmit}
    >
      <Paper elevation={elevation ?? 0} className={classes.textFieldsPaper}>
        {
          fields === 3 && (
            <TextField
              id="username"
              required
              className={classes.textField}
              variant="outlined"
              label="Username"
              value={username}
              onChange={handleOnChange}
            />
          )
        }

        <TextField
          id="email"
          required
          variant="outlined"
          className={classes.textField}
          label="Email"
          value={email}
          onChange={handleOnChange}
        />
        <TextField
          id="password"
          required
          type="password"
          variant="outlined"
          className={classes.textField}
          label="Password"
          value={password}
          onChange={handleOnChange}
        />
        <Button
          variant="contained"
          fullWidth
          color="secondary"
          type="submit"
          className={classes.submitButton}
        >
          {fields === 3 ? 'Sign Up' : 'Sign In'}
        </Button>
      </Paper>
    </form>
  );
}

export default Form;
