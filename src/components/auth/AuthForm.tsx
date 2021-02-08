/* eslint-disable no-unused-vars */
import React from 'react';
import {
  TextField,
  Paper,
  Button,
  InputAdornment,
  IconButton,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { grey, green } from '@material-ui/core/colors';
import {
  VisibilityOff, Visibility, CheckCircle,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    '& label.Mui-focused': {
      color: grey[200],
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
    margin: theme.spacing(1),
    width: 400,
  },
  submitButton: {
    width: 180,
    margin: 10,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
}));

type FormComponentProps = {
  elevation?: number,
  fields: number,
  username?: string,
  email: string,
  password: string,
  isLoading: boolean,
  inputError: {[field: string]: boolean},
  handleOnChange(event: any): void,
  handleOnSubmit(event: React.FormEvent<HTMLFormElement>): void,
}

function Form({
  elevation,
  fields,
  username,
  email,
  password,
  isLoading,
  inputError,
  handleOnChange,
  handleOnSubmit,
}: FormComponentProps) {
  const classes = useStyles();
  const [visible, setVisibility] = React.useState(false);

  function toggleVisibility() {
    setVisibility(!visible);
  }

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
              placeholder="user1"
              value={username}
              helperText={
                typeof inputError.username !== 'undefined' && !inputError.username
                && (
                <ErrorText text="username must contain atleast 3 characters" />
                )
              }
              InputProps={{
                endAdornment: (
                  inputError?.username && (
                    <InputAdornment position="end">
                      <CheckCircle color="primary" fontSize="small" />
                    </InputAdornment>
                  )
                ),
              }}
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
          placeholder="user1@somemailprovider.com"
          autoComplete="username"
          value={email}
          helperText={
            typeof inputError.email !== 'undefined' && !inputError.email
            && (
            <ErrorText text="please provide a valid email" />
            )
          }
          InputProps={{
            name: 'username',
            endAdornment: (
              inputError?.email && (
                <InputAdornment position="end">
                  <CheckCircle color="primary" fontSize="small" />
                </InputAdornment>
              )
            ),
          }}
          onChange={handleOnChange}
        />
        <TextField
          id="password"
          required
          type={visible ? 'text' : 'password'}
          variant="outlined"
          className={classes.textField}
          label="Password"
          placeholder="passwOrd#99"
          autoComplete="current-password"
          value={password}
          helperText={
            typeof inputError.password !== 'undefined' && !inputError.password
            && (
            <ErrorText text="password must contain an uppercase, lowercase, number and a special character" />
            )
          }
          InputProps={{
            endAdornment: (
              <>
                <InputAdornment position="end">
                  <IconButton onClick={toggleVisibility}>
                    {visible ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                  </IconButton>
                </InputAdornment>
                {
                  inputError?.password && (
                    <InputAdornment position="end">
                      <CheckCircle color="primary" fontSize="small" />
                    </InputAdornment>
                    )
                }
              </>
            ),
          }}
          onChange={handleOnChange}
        />
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            fullWidth
            color="secondary"
            type="submit"
            disabled={isLoading}
            className={classes.submitButton}
          >
            {fields === 3 ? 'Sign Up' : 'Sign In'}
          </Button>
          {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </Paper>
    </form>
  );
}

function ErrorText({ text }: { text: string }) {
  return (
    <Typography align="center" variant="caption" color="error">
      {text}
    </Typography>
  );
}

export default Form;
