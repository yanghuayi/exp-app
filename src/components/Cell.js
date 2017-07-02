import React, {Component, PropTypes} from "react";
import {View, Text, Platform, StyleSheet, PixelRatio, TouchableNativeFeedback, TouchableOpacity} from "react-native";
import px2dp from '../util/px2dp';
import theme from '../config/theme';
const styles = StyleSheet.create({
  iconStyle: {
    color: '#999',
    fontSize: px2dp(18),
    fontFamily: 'iconfont',
    textAlign: 'center'
  },
  listItem: {
    flex: 1,
    height: px2dp(50),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center'
  },
  defaultIcon: {
    width: px2dp(40)
  },
  text: {
    fontSize: px2dp(14),
    color: '#666666',
    lineHeight: px2dp(46),
    paddingLeft: px2dp(5)
  },
  border: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#e2e2e2',
    flex: 10
  },
  borderNone: {
    borderBottomWidth: 0
  },
  arrow: {
    position: 'absolute',
    right: px2dp(10),
    top: px2dp(17),
    fontFamily: 'iconfont',
    fontSize: px2dp(16),
    color: '#cecece'
  },
  arrowNone: {
    flex: 0,
    width: 0,
    height: 0
  }
});
export default class Cell extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    iconStyle: View.propTypes.style,
    text: PropTypes.string.isRequired,
    rightTxt: PropTypes.string,
    arrowShow: PropTypes.bool,
    onPress: PropTypes.func,
    last: PropTypes.bool
  };
  static defaultProps = {
    icon: '',
    iconStyle: styles.iconStyle,
    text: 'hello',
    rightTxt: '',
    arrowShow: true,
    last: false
  };
  _content () {
    const {icon, iconStyle, text, rightTxt, arrowShow, last} = this.props;
    return (
      <View style={styles.listItem}>
        <View style={styles.defaultIcon}>
          <Text style={[styles.iconStyle, iconStyle]}>{icon}</Text>
        </View>
        <View style={[styles.border, last ? styles.borderNone : null]}>
          <Text style={[styles.text]}>{text}</Text>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Text style={{color: "#ccc"}}>{rightTxt}</Text>
          </View>
          <Text style={arrowShow ? styles.arrow : styles.arrowNone}>&#xe634;</Text>
        </View>
      </View>
    )
  };
  render() {
    const {onPress} = this.props;
    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback style={{height: px2dp(50)}} onPress={onPress}>
          {this._content()}
        </TouchableNativeFeedback>
      );
    } else if (Platform.OS === 'ios') {
      return (
        <TouchableOpacity style={{height: px2dp(50)}} onPress={onPress} activeOpacity={theme.btnActiveOpacity}>
          {this._content()}
        </TouchableOpacity>
      );
    }
  }
}