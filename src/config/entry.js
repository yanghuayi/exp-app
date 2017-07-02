/**
 * Created by wangdi on 4/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {PixelRatio} from 'react-native';
import {
  StackNavigator,
  TabNavigator,
} from 'react-navigation';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


import px2dp from '../util/px2dp';

import MainPage from '../views/MainPage';
import Order from '../views/Order';
import Message from '../views/Message';
import PersonPage from '../views/PersonPage';
import NeedDetail from '../views/need/NeedDetail';


const TabNav = TabNavigator({
  Home: {
    screen: MainPage,
    path: '/',
    navigationOptions: {
      title: '需求大厅',
      tabBarLabel: '需求大厅',
      headerStyle: {
        backgroundColor: '#ff634e',
      },
      headerTintColor: '#fff',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons name="md-home" size={24} color={tintColor} />
      )
    }
  },
  Order: {
    screen: Order,
    path: '/order',
    navigationOptions: {
      title: '我的工地',
      tabBarLabel: '我的工地',
      headerStyle: {
        backgroundColor: '#ff634e',
      },
      headerTintColor: '#fff',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons name="md-build" size={24} color={tintColor} />
      )
    }
  },
  Message: {
    screen: Message,
    path: '/message',
    navigationOptions: {
      title: '我的消息',
      tabBarLabel: '我的消息',
      headerStyle: {
        backgroundColor: '#ff634e',
      },
      headerTintColor: '#fff',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialCommunityIcons name="message-processing" size={22} color={tintColor} />
      )
    }
  },
  PersonPage: {
    screen: PersonPage,
    path: '/personPage',
    navigationOptions: {
      header: null,
      tabBarLabel: '个人中心',
      headerStyle: {
        backgroundColor: '#ff634e',
      },
      headerTintColor: '#fff',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialCommunityIcons name="worker" size={24} color={tintColor} />
      )
    }
  }
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#ff634e',
    inactiveTintColor: '#666',
    style: {
      backgroundColor: '#fff',
      borderTopColor: '#dcdcdc',
      borderTopWidth: 1 / PixelRatio.get(),
      height: px2dp(50),
    },
    tabStyle: {
    },
    labelStyle: {
      position: 'relative',
      top: px2dp(-5),
      fontSize: px2dp(10)
    },
    indicatorStyle: {
      backgroundColor: '#fff'
    },
    iconStyle: {
      position: 'relative',
      top: px2dp(-5)
    },
    showIcon: true
  },
});

const StacksOverTabs = StackNavigator({
  Root: {
    screen: TabNav,
  },
  NeedDetail: {
    screen: NeedDetail,
    path: '/needDetial',
    navigationOptions: {
      header: null
    },
  }
});

export default StacksOverTabs;