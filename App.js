import React from 'react';
import Navigation from './src/config/entry';

export default class App extends React.Component {
  _onPress () {
    Alert.alert('陈锐')
  };
  render() {
    return (
      <Navigation />
    );
  }
}
