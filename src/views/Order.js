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
  static navigationOptions = {
    tabBarLabel: 'Order',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Ionicons name="wrench" size={32} color={tintColor} />
    ),
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