/**
 * Created by CQMIMI on 2017/3/1 0001.
 */
import react, {Dimensions} from 'react-native';
import {Toast} from 'antd-mobile';
function jsonEval (str) {
  let string = str.replace(/\n/g, "").replace(/\r/g, "");
  return eval('('+ string +')');
}
let {height, width} = Dimensions.get('window');
let util = {
  screen: {
    width: width,
    height: height
  },
  showToast: (text) => {
    Toast.info(text)
  },
  post: function (url, data, callback) {
    let fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data
    };

    fetch(url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
          callback(jsonEval(responseText));
        }).done();
  },

  //get请求
  get: function (url, callback) {
    fetch(url)
        .then((response) => response.text())
        .then((responseText) => {
          callback(jsonEval(responseText));
          // callback(responseText);
        }).done();
  },

  log:function (obj){
    let description = "";
    for(let i in obj){
      let property=obj[i];
      description+=i+" = "+property+"\n";
    }
    alert(description);
  }
};
export default util
