function countdown (endTime) {
  var EndTime = new Date(endTime)
  var NowTime = new Date()
  var t = EndTime.getTime() - NowTime.getTime()                                                                                                                                                                                                                                                                                                                                                                                                                    
  var d = 0
  var h = 0
  var m = 0
  var s = 0
  if (t >= 0) {
    d = Math.floor(t / 1000 / 60 / 60 / 24)
    h = Math.floor(t / 1000 / 60 / 60 % 24)
    m = Math.floor(t / 1000 / 60 % 60)
    s = Math.floor(t / 1000 % 60)
  }
  return '还有' + d + '天' + h + '时' + m + '分' + s + '秒截止'
}
export {
  countdown
}