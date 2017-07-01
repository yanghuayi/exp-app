/**
 * Created by wangdi on 4/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {
  TabNavigator,
} from 'react-navigation';
import MainPage from '../views/MainPage';
import Order from '../views/Order';
export default TabNavigator({
  Home: {
    screen: MainPage,
  },
  Order: {
    screen: Order
  }
}, {
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});
