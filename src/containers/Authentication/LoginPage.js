import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, FormControl, Button, Paper } from '@material-ui/core';
import { useHistory } from 'react-router';
import firebase from '../../firebase';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      padding: '30px'
    },
    paper: {
        padding: '20px',
        width: theme.spacing(36),
    },
    form: {
      width: theme.spacing(36),
      '& > *': {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
      },
    }
  }));

const LoginCard = () => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValid = (email !== '') && (password.length > 7);

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            console.log(res);
            history.push('/');
        })
        .catch(err => {
            console.error(err);
        });
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
          <FormControl className={classes.form}>
            <Typography variant="h5">Login</Typography>
            <TextField fullWidth type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField fullWidth type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button variant="outlined" disabled={!isValid} onClick={handleLogin}>Login</Button>
          </FormControl>
      </Paper>
    </div>
  );
}

export default LoginCard;