/**
 * 网络请求配置
 */
import axios from "axios";
import { Toast } from "antd-mobile";

axios.defaults.timeout = 100000;
// axios.defaults.baseURL = BASE_URL

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.data = JSON.stringify(config.data);
    config.headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      config.headers.token = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
  (response) => {
    if (response?.data.errCode === 2) {
      console.log("过期");
    }
    return response;
  },
  (error) => {
    // console.log("请求出错：", error);
    msg(error);
  }
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url: any, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        msg(error);
        reject(error);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url: any, data: any) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        //关闭进度条
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url: any, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        msg(err);
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url: any, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        msg(err);
        reject(err);
      }
    );
  });
}

//失败提示
function msg(err: any) {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        break;
      case 401:
        Toast.show({
          content: "未授权，请登录",
        });
        break;
      case 403:
        Toast.show({
          content: "拒绝访问",
        });
        break;

      case 404:
        Toast.show({
          content: "请求地址出错",
        });
        break;

      case 408:
        Toast.show({
          content: "请求超时",
        });
        break;

      case 500:
        Toast.show({
          content: "服务器内部错误",
        });
        break;

      case 501:
        Toast.show({
          content: "服务未实现",
        });
        break;

      case 502:
        Toast.show({
          content: "网关错误",
        });
        break;

      case 503:
        Toast.show({
          content: "服务不可用",
        });
        break;

      case 504:
        Toast.show({
          content: "网关超时",
        });
        break;

      case 505:
        Toast.show({
          content: "HTTP版本不受支持",
        });
        break;
      default:
    }
  }
}
