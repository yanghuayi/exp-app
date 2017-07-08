/**
 * Created by CQMIMI on 2017/3/1 0001.
 */
/**
 * Created by wangdi on 4/11/16.
 */
'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, Platform, TouchableHighlight, TouchableNativeFeedback} from 'react-native';
import px2dp from '../util/px2dp';
import theme from '../config/theme';

export default class IconButton extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    btnStyle: View.propTypes.style,
    textStyle: View.propTypes.style
  };

  render() {
    if (Platform.OS === 'android') {
      return (
          <TouchableNativeFeedback
              onPress={this.props.onPress}
              style={[styles.btnStyle]}
          >
            {this._renderContent()}
          </TouchableNativeFeedback>
      );
    } else if (Platform.OS === 'ios') {
      return (
          <TouchableHighlight
              onPress={this.props.onPress}
              activeOpacity={theme.btnActiveOpacity}
              style={[styles.btnStyle]}
          >
            {this._renderContent()}
          </TouchableHighlight>
      );
    }
  }

  _renderContent() {
    const {btnStyle, textStyle } = this.props;
    return (
        <View style={[btnStyle]}>
          <Text style={[styles.text, textStyle, {fontFamily: 'iconfont'}]}>{this.props.text}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  btnStyle: {

  },
  text: {
    color: 'white',
    fontSize: px2dp(16)
  }
});