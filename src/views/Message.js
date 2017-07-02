'use strict';

import React, {Component} from 'react';
import {View, Button} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class MainScene extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
    };
  };
  render () {
    const { navigate } = this.props.navigation;
    return (
      <Button
        onPress={() => navigate('Home')}
        title="Go home"
      />
    )
  }
}