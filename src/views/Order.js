'use strict';

import React, {Component} from 'react';
import {View, Button} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class MainScene extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
    };
  };
  render () {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    )
  }
}