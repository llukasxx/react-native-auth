import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';


export default class App extends Component {
  state = {
    loggedIn: null
  };
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAa9-e3LsDN8k5iKIQw4CAFTkO9YnU6um8',
      authDomain: 'auth-f6df4.firebaseapp.com',
      databaseURL: 'https://auth-f6df4.firebaseio.com',
      projectId: 'auth-f6df4',
      storageBucket: 'auth-f6df4.appspot.com',
      messagingSenderId: '585151601649'
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log off
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}
