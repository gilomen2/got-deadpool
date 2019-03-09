import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import firebase from 'firebase'

class CreateUser extends Component {

  state = {
    emailAddress: 'thronesdeadpool1@mailinator.com',
    password: 'password'
  }

  createUser() {
    firebase.auth().createUserWithEmailAndPassword(this.state.emailAddress, this.state.password)
      .then(user => {
        console.log(user);
        this.logIn();
      })
      .catch(error => {
        console.log(error)
      })
  }

  logIn() {
    firebase.auth().signInWithEmailAndPassword(this.state.emailAddress, this.state.password)
      .then(response => {
        debugger;
        const {user} = response;
        if (!user.displayName){
          user.updateProfile({displayName: this.state.emailAddress}).then(val => {
            console.log(val);
          });
        }
        console.log(user);
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        <h2>Create User (Or Login)</h2>
        <TextField
          id='email-address'
          label='Email Address'
          placeholder='Email Address'
          //className={classes.textField}
          margin='normal'
          onChange={e => {
            this.setState({
              emailAddress: e.target.value
            })
          }}
          value={this.state.emailAddress}
        />
        <TextField
          id='password'
          label='Password'
          placeholder='Password'
          //className={classes.textField}
          margin='normal'
          onChange={e => {
            this.setState({
              password: e.target.value
            })
          }}
          value={this.state.password}
        />
        <Button variant="contained" color="secondary" /*classes={{label: classes.buttonColor}}*/ onClick={() => this.createUser()}>
          Create
        </Button>
        <Button variant="contained" color="secondary" /*classes={{label: classes.buttonColor}}*/ onClick={() => this.logIn()}>
          Log In
        </Button>
        
      </div>
    );
  }
}

export default CreateUser
