import React from 'react';
import {
  TextField, Paper, Button, InputAdornment, IconButton,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
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
}));

type FormComponentProps = {
  elevation?: number,
  fields: number,
  username?: string,
  email: string,
  password: string,
  inputError: {[field: string]: boolean},
  handleOnChange(event: any): void,
  handleOnSubmit(event: React.FormEvent<HTMLFormElement>): void,
}

function Form({
  elevation, fields, username, email, password, inputError, handleOnChange, handleOnSubmit,
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    { inputError?.username && <CheckCircle color="primary" fontSize="small" />}
                  </InputAdornment>
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
          InputProps={{
            name: 'username',
            endAdornment: (
              <InputAdornment position="end">
                { inputError?.email && <CheckCircle color="primary" fontSize="small" />}
              </InputAdornment>
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
          InputProps={{
            endAdornment: (
              <>
                <InputAdornment position="end">
                  <IconButton onClick={toggleVisibility}>
                    {visible ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                  </IconButton>
                </InputAdornment>
                <InputAdornment position="end">
                  { inputError?.password && <CheckCircle color="primary" fontSize="small" />}
                </InputAdornment>
              </>
            ),
          }}
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
