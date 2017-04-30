import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common';
import LoginForm from './components/LoginForm';


export default class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAa9-e3LsDN8k5iKIQw4CAFTkO9YnU6um8',
      authDomain: 'auth-f6df4.firebaseapp.com',
      databaseURL: 'https://auth-f6df4.firebaseio.com',
      projectId: 'auth-f6df4',
      storageBucket: 'auth-f6df4.appspot.com',
      messagingSenderId: '585151601649'
    });
  }
  render() {
    return (
      <View>
        <Header headerText={'Authentication'} />
        <LoginForm />
      </View>
    );
  }
}
