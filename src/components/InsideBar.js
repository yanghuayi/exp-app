import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import px2dp from '../util/px2dp';
export default class InsideBar extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    style: View.propTypes.style,
    back: PropTypes.func
  };
  static defaultProps = {
    title: '标题',
    style: null
  };
  _back () {
    this.props.back();
  };
  render () {
    return (
      <View style={[styles.insideBar, this.props.style]}>
        <StatusBar
          backgroundColor='transparent'
          translucent={true}
          barStyle="light-content"
        />
        <Text onPress={this._back.bind(this)} style={[styles.backIcon]}>&#xe634;</Text>
        <Text style={[styles.centerText]}>{this.props.title}</Text>
        <Text style={[styles.rightIcon]}>&#xe6c7;</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  insideBar: {
    paddingTop: px2dp(30),
    backgroundColor: '#f58e41',
    paddingBottom: px2dp(40),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: px2dp(40)
  },
  centerText: {
    fontSize: px2dp(16),
    color: '#fff',
    lineHeight: px2dp(32),
    height: px2dp(32)
  },
  backIcon: {
    fontFamily: 'iconfont',
    fontSize: px2dp(18),
    lineHeight: px2dp(32),
    height: px2dp(32),
    color: '#fff',
    paddingRight: px2dp(10),
    transform: [
      {rotate: '180deg'}
    ]
  },
  rightIcon: {
    fontFamily: 'iconfont',
    fontSize: px2dp(20),
    lineHeight: px2dp(36),
    height: px2dp(32),
    color: '#fff',
    paddingRight: px2dp(10)
  }
});