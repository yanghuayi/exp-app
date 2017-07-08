import React from 'react';
import {View} from 'react-native';
import Navigation from './src/config/entry';
import { Font, AppLoading } from 'expo';

import cacheAssetsAsync from './src/util/cacheAssetsAsync';
let Navigations = Navigation
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    };
  };
  componentDidMount() {
    this._loadAssetsAsync();
  };
  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        fonts: [
          { 'iconfont': require('./assets/fonts/iconfont.ttf') },
        ]
      });
    } catch (e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
          'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e.message);
    } finally {
      console.log('fontsLoaded')
      this.setState({ fontLoaded: true });
    }
  };
  render () {
    // if (this.state.fontLoaded) {return <AppLoading />;}
    // return null;
    // return (
    //   <Navigation />
    // )
    return this.state.fontLoaded ? <Navigation /> : <AppLoading />
  }
}
