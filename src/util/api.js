/**
 * Created by CQMIMI on 2017/3/1 0001.
 */
const workerAjax = 'https://www.huomanju.com/DataProvider/wapWorker/';
const frontAjax = 'https://www.huomanju.com/DataProvider/wap/';
let Api =  {
  GETCODE: workerAjax + 'getCode',
  LOGIN: frontAjax + 'loginWithCode',
  CHECKLOGIN: frontAjax + 'getUserBaseInfo',
  HOME: workerAjax + 'checkWorkerLogin'
};
export default Api
