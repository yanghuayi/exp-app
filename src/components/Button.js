/**
 * Created by wangdi on 4/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {Text, View, StyleSheet, Platform, TouchableHighlight, TouchableNativeFeedback} from 'react-native';
import px2dp from '../util/px2dp';
import theme from '../config/theme';

export default class Button extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    btnStyle: View.propTypes.style,
    textStyle: View.propTypes.style,
    disabled: PropTypes.bool,
    disabledStyle: View.propTypes.style
  };

  render() {
    if (Platform.OS === 'android') {
      return (
          <TouchableNativeFeedback
              onPress={this.props.onPress}
              disabled={this.props.disabled}
          >
            {this._renderContent()}
          </TouchableNativeFeedback>
      );
    } else if (Platform.OS === 'ios') {
      return (
          <TouchableHighlight
              onPress={this.props.onPress}
              activeOpacity={theme.btnActiveOpacity}
              disabled={this.props.disabled}
          >
            {this._renderContent()}
          </TouchableHighlight>
      );
    }
  }

  _renderContent() {
    const { btnStyle, textStyle } = this.props;
    let disabledStyle = this.props.disabled ? this.props.disabledStyle : null;
    return (
        <View style={[{flex: 1, height: px2dp(45), backgroundColor: '#f57d23', alignItems: 'center', justifyContent: 'center',
          borderRadius: 3}, btnStyle, disabledStyle]}>
          <Text style={[styles.text, textStyle]}>{this.props.text}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: px2dp(16)
  }
});