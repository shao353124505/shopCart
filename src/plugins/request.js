// import axios from 'axios';
// import router from '@/pages/login/router';
// import store from '@/pages/login/store';
// import {message} from 'ant-design-vue'
const uuid = require("uuid");
const xss = require("xss");

/**
 *
 * @param {Number} status error code
 */
const errorHandle = (status, other) => {
  switch (status) {
    // 401: no login in
    case 401:
      reloadParentPage();
      break;
    // 403 token expire
    // clear token and redirect to login page
    case 403:
      // errorTip('Logon expires, please login again');
      // localStorage.removeItem('token');
      // store.commit('loginSuccess', null);
      // setTimeout(() => {
      //   toLogin();
      // }, 1000);
      break;
    // 404请求不存在
    case 404:
      // errorTip("request not found");
      break;
    default:
      console.log(other);
  }
};

function reloadParentPage() {
  let selfUrl = unescape(parent.window.location.pathname);
  parent.location.reload(true);

  parent.window.location.replace(selfUrl);

  parent.window.location.href = selfUrl;
}

let instance = axios.create({
  timeout: 1000 * 100
});

instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

//disable get cache for IE
instance.defaults.headers.get["Cache-Control"] = "no-cache";
instance.defaults.headers.get["Pragma"] = "no-cache";
/**
 * request interceptor
 * Before each request, if token exists, carry it in the request header
 */
instance.interceptors.request.use(
  config => {
    // console.log(JSON.stringify(config));

    //add trace id for request
    config.headers["x-trace-id"] = uuid.v4();

    //xss filter request url
    config.url = xss(config.url);

    return config;
  },
  error => Promise.error(error)
);

instance.interceptors.response.use(
  res => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),

  error => {
    const { response } = error;
    if (response) {
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        // store.commit('changeNetwork', false);
      } else {
        return Promise.reject(error);
      }
    }
  }
);

export default instance;
