/**
 * Created by wangdi on 4/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import HomeFragment from '../page/HomeFragment';
import CompassFragment from '../page/CompassFragment';
import MeFragment from '../page/MeFragment';
import NotifyFragment from '../page/NotificationFragment';
import px2dp from '../util/px2dp';


export default class TabBar extends Component {
  static defaultProps = {
    selectedColor: '#ff634e',
    normalColor: '#a29d94'
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      tabName: ['需求大厅', '在建工地', '我的消息', '个人中心']
    }
  }

  render() {
    const {selectedColor} = this.props;
    const {tabName} = this.state;
    return (
        <TabNavigator
            hidesTabTouch={true}
            tabBarStyle={styles.tabbar}
            sceneStyle={{paddingBottom: styles.tabbar.height}}>
          <TabNavigator.Item
              tabStyle={styles.tabStyle}
              title={tabName[0]}
              selected={this.state.selectedTab === 'home'}
              selectedTitleStyle={{color: selectedColor}}
              renderIcon={() => <Text style={styles.tabIcon}>&#xe6c0;</Text>}
              renderSelectedIcon={() => <Text style={[styles.tabIcon, styles.selectIcon]}>&#xe6c1;</Text>}
              onPress={() => this.setState({selectedTab: 'home'})}>
            {<HomeFragment navigator={this.props.navigator}/>}
          </TabNavigator.Item>
          <TabNavigator.Item
              tabStyle={styles.tabStyle}
              title={tabName[1]}
              selected={this.state.selectedTab === 'compass'}
              selectedTitleStyle={{color: selectedColor}}
              renderIcon={() => <Text style={styles.tabIcon}>&#xe6c3;</Text>}
              renderSelectedIcon={() => <Text style={[styles.tabIcon, styles.selectIcon]}>&#xe6c4;</Text>}
              onPress={() => this.setState({selectedTab: 'compass'})}>
            {<CompassFragment />}
          </TabNavigator.Item>
          <TabNavigator.Item
              tabStyle={styles.tabStyle}
              title={tabName[2]}
              selected={this.state.selectedTab === 'notification'}
              selectedTitleStyle={{color: selectedColor}}
              renderIcon={() => <Text style={styles.tabIcon}>&#xe6c2;</Text>}
              renderSelectedIcon={() => <Text style={[styles.tabIcon, styles.selectIcon]}>&#xe6bf;</Text>}
              onPress={() => this.setState({selectedTab: 'notification'})}>
            {<NotifyFragment navigator={this.props.navigator}/>}
          </TabNavigator.Item>
          <TabNavigator.Item
              tabStyle={styles.tabStyle}
              title={tabName[3]}
              selected={this.state.selectedTab === 'me'}
              selectedTitleStyle={{color: selectedColor}}
              renderIcon={() => <Text style={styles.tabIcon}>&#xe6bd;</Text>}
              renderSelectedIcon={() => <Text style={[styles.tabIcon, styles.selectIcon]}>&#xe6be;</Text>}
              onPress={() => this.setState({selectedTab: 'me'})}>
            {<MeFragment navigator={this.props.navigator}/>}
          </TabNavigator.Item>
        </TabNavigator>
    );
  }

  componentWillMount() {

  }
}

const styles = StyleSheet.create({
  selectIcon: {
    color: '#ff634e'
  },
  tabbar: {
    height: px2dp(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  tabStyle: {
    padding: px2dp(8),
    top: px2dp(4)
  },
  tabIcon: {
    fontFamily: 'iconfont',
    fontSize: px2dp(20),
    color: '#a29d94'
  },
  tab: {
    width: px2dp(22),
    height: px2dp(22)
  }
});