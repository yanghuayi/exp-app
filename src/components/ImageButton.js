/**
 * Created by wangdi on 4/11/16.
 */
'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactNative, {Text, View, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Image} from 'react-native';
import px2dp from '../util/px2dp';
import theme from '../config/theme';

export default class ImageButton extends Component{

    static propTypes = {
        text: PropTypes.string,
        image: PropTypes.number.isRequired,
        onPress: PropTypes.func,
        imgSize: PropTypes.number,
        fontSize: PropTypes.number,
        color: PropTypes.string,
        btnStyle: View.propTypes.style
    };

    static defaultProps = {
        imgSize: px2dp(40),
        fontSize: px2dp(13)
    };

    render() {
        const {image, icon, onPress} = this.props;

        if (Platform.OS === 'ios') {
            return (
                <TouchableOpacity onPress={onPress} activeOpacity={theme.btnActiveOpacity}>
                    {this._renderContentWithImage()}
                </TouchableOpacity>
            );
        } else if (Platform.OS === 'android') {
            return (
                <TouchableNativeFeedback onPress={onPress}>
                    {this._renderContentWithImage()}
                </TouchableNativeFeedback>
            );
        }
    }

    _renderContentWithImage(){
        const {text, image, color, imgSize, fontSize, btnStyle} = this.props;
        return(
            <View style={[styles.view, btnStyle]}>
                <Image source={image} style={{width: imgSize, height: imgSize}}/>
                {text ?
                    <Text style={[styles.text, {fontSize: fontSize, color: color}]}>{text}</Text>
                    :
                    null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    text:{
        color: 'rgba(255,255,255,0.7)',
        marginTop: px2dp(4)
    }
});
