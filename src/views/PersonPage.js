/**
 * Created by wangdi on 4/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Button,
  PixelRatio,
  TouchableNativeFeedback,
  TouchableOpacity,
  Image,
  Alert,
  AlertIOS,
  AsyncStorage,
  StatusBar
} from 'react-native';
import px2dp from '../util/px2dp';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../config/theme';
import Cell from '../components/Cell';
export default class MeFragment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageData: {
        worker_head: 'https://wx.qlogo.cn/mmopen/SMGstXQSFntB3aUic1h4cdTZJ1u5GZ4hv939rrTtn7piadwBD26ibLsNP6aK0jWXx3WnDwlTkurkXfvvejKcTsTAFGqqDjrjL6l/0',
        worker_state: false,
        worker_name: '杨铧益',
        worker_type: '水电工',
        worker_type_id: 4,
        worker_dengji: 'tong',
        worker_zhi: true,
        worker_xian: true,
        worker_cheng: true,
        level: 2
      }
    };
  }

  _onPressCallback(position) {
    switch (position) {
      case 0:  //title
        this.props.navigator.push({
          component: IndividualPage
        });
        break;

      case 1:  // add occupation
        this._alert();
        break;

      case 2:  //collection
        this._alert();
        break;

      case 3:  //read articles
        this._alert();
        break;

      case 4:  //tags
        this._alert();
        break;

      case 5:  //rank
        this._alert();
        break;

      case 6: {  //setting
        this.props.navigator.push({
          component: SettingPage
        });
        break;
      }
    }
  }
  componentWillMount () {
    const self = this;
    let userId = null;
    AsyncStorage.getItem('userId').then((data) => {
      userId = data
    });
    // Util.post(Api.HOME, 'worker_id=' + userId, (data) => {
    //   console.log(data);
    //   if (data.code === '200') {
    //     self.setState({
    //       pageData: data
    //     })
    //   }
    // });
  }
  _iconType = (id) => {
    let Obj = null;
    let typeStyle = StyleSheet.create({
      typexc: {
        backgroundColor: '#f0582f',
        color: '#fff'
      },
      typesd: {
        backgroundColor: '#00b1fb',
        color: '#fff'
      },
      typenw: {
        backgroundColor: '#c68617',
        color: '#fff'
      },
      typemg: {
        backgroundColor: '#9393d2',
        color: '#fff'
      },
      typeqg: {
        backgroundColor: '#31d472',
        color: '#fff'
      }
    });
    switch (id) {
      case 3:  Obj = <Text style={[styles.TypeIcon, typeStyle.typexc]}>&#xe75c;</Text>;
        break;
      case 4:  Obj = <Text style={[styles.TypeIcon, typeStyle.typesd]}>&#xe7ec;</Text>;
        break;
      case 5:  Obj = <Text style={[styles.TypeIcon, typeStyle.typenw]}>&#xe609;</Text>;
        break;
      case 6:  Obj = <Text style={[styles.TypeIcon, typeStyle.typemg]}>&#xe60a;</Text>;
        break;
      case 7:  Obj = <Text style={[styles.TypeIcon, typeStyle.typeqg]}>&#xe60c;</Text>;
        break;
    }
    return (
      <View style={[styles.TypeIcon, {overflow: 'hidden'}]}>
        { Obj }
      </View>
    );
  }
  _renderType (type_id, level) {
    var typeImg = null;
    switch (type_id) {
      case 3:
        typeImg = require('../images/worker-type-xc.png');
        break;
      case 4:
        typeImg = require('../images/worker-type-sd.png');
        break;
      case 5:
        typeImg = require('../images/worker-type-nw.png');
        break;
      case 6:
        typeImg = require('../images/worker-type-mg.png');
        break;
      case 7:
        typeImg = require('../images/worker-type-qg.png');
        break;
    }
    var levelImg = null;
    switch (level) {
      case 1:
        levelImg = require('../images/worker-grade-xt.png');
        break;
      case 2:
        levelImg = require('../images/worker-grade-cj.png');
        break;
      case 3:
        levelImg = require('../images/worker-grade-zj.png');
        break;
      case 4:
        levelImg = require('../images/worker-grade-gj.png');
        break;
    }
    return (
      <View style={styles.typeContainer}>
        <Image source={typeImg} style={styles.workerTypeImg} resizeMode="contain" />
        <Image source={levelImg} style={styles.workerLevelImg} resizeMode="contain" />
      </View>
    )
  };
  render() {
    return (
        <View style={styles.container}>
          <StatusBar
              backgroundColor='transparent'
              translucent={true}
              barStyle="light-content"
          />
          <LinearGradient
              start={{x: .1, y: .8}}
              end={{x: .9, y: .2}}
              colors={['#ff8c4e', '#ff634e']}
              style={styles.linearGradient} >
            <View style={styles.headWrap}>
              <Image source={{uri: this.state.pageData.worker_head}} style={styles.headImg} />
              <Text style={styles.headState}>{this.state.pageData.worker_state ? '工期已满' : '工期未满'}</Text>
            </View>
            <View style={styles.nameWrap}>
              <View style={styles.nameLine}>
                <Text style={styles.nameText}>{this.state.pageData.worker_name}</Text>
                {
                  this._renderType(this.state.pageData.worker_type_id, this.state.pageData.level)
                }
              </View>
              <View style={styles.workerIcon}>
                  <View style={styles.wIconItem}>
                    <Image style={styles.wIcon} source={require('../images/worker_icon_03.png')} />
                    <LinearGradient style={styles.wIconBg} colors={['rgb(255, 242, 213)', 'rgb(245, 205, 119)']}>
                      <Text style={styles.wIconText}>质保金</Text>
                    </LinearGradient>
                  </View>
                  <View style={styles.wIconItem}>
                    <Image style={styles.wIcon} source={require('../images/worker_icon_05.png')} />
                    <LinearGradient style={styles.wIconBg} colors={['rgb(255, 242, 213)', 'rgb(245, 205, 119)']}>
                      <Text style={styles.wIconText}>保险</Text>
                    </LinearGradient>
                  </View>
                  <View style={styles.wIconItem}>
                    <Image style={styles.wIcon} source={require('../images/worker_icon_07.png')} />
                    <LinearGradient style={styles.wIconBg} colors={['rgb(255, 242, 213)', 'rgb(245, 205, 119)']}>
                      <Text style={styles.wIconText}>诚信认证</Text>
                    </LinearGradient>
                  </View>
              </View>
            </View>
          </LinearGradient>
          <View style={styles.flexMenu}>
            <View style={styles.flexItem}>
              <Text style={styles.flexIcon}>&#xe65d;</Text>
              <Text style={styles.flexTxt}>被预约</Text>
            </View>
            <View style={styles.flexItem}>
              <Text style={styles.flexIcon}>&#xe6b5;</Text>
              <Text style={styles.flexTxt}>已中标</Text>
            </View>
            <View style={styles.flexItem}>
              <Text style={styles.flexIcon}>&#xe6ba;</Text>
              <Text style={styles.flexTxt}>待进场</Text>
            </View>
          </View>
          <View style={styles.group}>
            <Cell icon="&#xe6b8;" text="我的工地" iconStyle={iconStyle.mySite} />
            <Cell icon="&#xe67b;" text="我的钱包" iconStyle={[iconStyle.mySite, iconStyle.person]} />
            <Cell icon="&#xe6bb;" text="个人资料" iconStyle={[iconStyle.mySite, iconStyle.person]} />
            <Cell icon="&#xe6b7;" text="推荐好友" iconStyle={[iconStyle.mySite, iconStyle.friend]} />
            <Cell icon="&#xe6b9;" text="我的评分" iconStyle={[iconStyle.mySite, iconStyle.score]} last={true} />
          </View>
          <View style={styles.group}>
            <Cell icon="&#xe6bc;" text="系统设置" iconStyle={[iconStyle.mySite, iconStyle.setting]} last={true} />
          </View>
        </View>
    );
  }

  _alert() {
    if (Platform.OS === 'android') {
      Alert.alert(
          'Message',
          "This function currently isn't available",
          [{
            text: 'OK', onPress: () => {
            }
          }]
      );
    } else if (Platform.OS === 'ios') {
      AlertIOS.alert(
          'Message',
          "This function currently isn't available",
          [{
            text: 'OK', onPress: () => {
            }
          }]
      );
    }
  }
}

const iconStyle = StyleSheet.create({
  mySite: {
    borderRadius: px2dp(4),
    backgroundColor: '#ffbe3a',
    color: '#fff',
    width: px2dp(24),
    height: px2dp(24),
    textAlign: 'center',
    lineHeight: px2dp(24),
    marginLeft: px2dp(8),
    overflow: 'hidden'
  },
  person: {
    backgroundColor: '#ff9241',
    fontSize: px2dp(16)
  },
  friend: {
    backgroundColor: '#fd631f',
    fontSize: px2dp(14),
    lineHeight: px2dp(22)
  },
  score: {
    backgroundColor: '#ffd322',
    fontSize: px2dp(18),
  },
  setting: {
    backgroundColor: '#cac6be',
    fontSize: px2dp(16)
  }
});
const styles = StyleSheet.create({
  group: {
    backgroundColor: '#fff',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderTopWidth: 1 / PixelRatio.get(),
    borderColor: '#ececec',
    marginTop: px2dp(10)
  },
  flexMenu: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingTop: px2dp(15),
    paddingBottom: px2dp(15),
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#e2e2e2'
  },
  flexItem: {
    flex: 1,
    borderRightWidth: 1 / PixelRatio.get(),
    borderColor: '#cbcbcb'
  },
  flexTxt: {
    textAlign: 'center',
    color: '#666666',
    fontSize: px2dp(12)
  },
  flexIcon: {
    textAlign: 'center',
    fontFamily: 'iconfont',
    fontSize: px2dp(20),
    color: '#a29d94'
  },
  wIconBg: {
    height: px2dp(16),
    borderRadius: px2dp(2)
  },
  wIcon: {
    width: px2dp(20),
    height: px2dp(20),
    position: 'absolute',
    zIndex: 2,
    left: px2dp(-4),
    top: px2dp(-2)
  },
  wIconText: {
    fontSize: px2dp(8),
    color: '#fb7f26',
    paddingLeft: px2dp(22),
    paddingRight: px2dp(6),
    lineHeight: px2dp(13),
    backgroundColor: 'transparent'
  },
  wIconItem: {
    marginRight: px2dp(10),
    flexDirection: 'row'
  },
  workerIcon: {
    flexDirection: 'row',
    flex: 2
  },
  workerType: {
    height: px2dp(18),
    borderRadius: px2dp(12),
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingLeft: px2dp(2),
    paddingTop: px2dp(2),
    marginTop: px2dp(4)
  },
  TypeIcon: {
    fontFamily: 'iconfont',
    fontSize: px2dp(10),
    lineHeight: px2dp(12),
    width: px2dp(14),
    height: px2dp(14),
    borderRadius: px2dp(7),
    textAlign: 'center'
  },
  workerTypeText: {
    fontSize: px2dp(10),
    paddingLeft: px2dp(2),
    paddingRight: px2dp(7),
    color: '#666',
    lineHeight: px2dp(12),
    backgroundColor: 'transparent'
  },
  nameWrap: {
    flex: 12
  },
  nameLine: {
    paddingTop: px2dp(10),
    flex: 1,
    flexDirection: 'row'
  },
  nameText: {
    fontSize: px2dp(18),
    color: '#fff',
    marginRight: px2dp(5),
    backgroundColor: 'transparent'
  },
  headWrap: {
    width: px2dp(70),
    height: px2dp(80),
    flex: 4,
  },
  headImg: {
    width: px2dp(70),
    height: px2dp(70),
    borderWidth: px2dp(2),
    borderColor: '#fff',
    borderRadius: px2dp(35)
  },
  headState: {
    fontSize: px2dp(10),
    backgroundColor: '#1cd3a6',
    color: '#fff',
    position: 'absolute',
    paddingLeft: px2dp(5),
    paddingRight: px2dp(5),
    paddingTop: px2dp(2),
    paddingBottom: px2dp(2),
    borderRadius: px2dp(4),
    bottom: px2dp(4),
    left: px2dp(11),
    overflow: 'hidden'
  },
  linearGradient: {
    height: px2dp(150),
    paddingTop: px2dp(40),
    paddingLeft: px2dp(20),
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    backgroundColor: theme.pageBackgroundColor
  },
  list: {
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#e4e4e4',
    marginTop: px2dp(15)
  },
  listItem: {
    flex: 1,
    height: px2dp(50),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: px2dp(25),
    paddingRight: px2dp(25),
    borderBottomColor: '#c4c4c4',
    borderBottomWidth: 1 / PixelRatio.get()
  },
  typeContainer: {
    flexDirection: 'row',
    position: 'relative',
    top: px2dp(-6)
  },
  workerTypeImg: {
    width: px2dp(50),
  },
  workerLevelImg: {
    width: px2dp(44),
    marginLeft: px2dp(5)
  }
});