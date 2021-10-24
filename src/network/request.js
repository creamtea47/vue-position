import axios from 'axios';

// 实例配置
const instance = axios.create({
  baseURL: "http://47.103.115.168:8080",
  timeout: 4000
});

// 请求头配置
const request_header = {
  'Accept': "application/json, text/plain, */*",
  'Content-Type': 'application/json; charset=UTF-8'
}

// 请求拦截器
instance.interceptors.request.use(config => {
  // post请求序列化
  if (config.method == "post") {
    config.data = JSON.stringify(config.data);
    config.headers = request_header;
  }
  // 添加token
  config.headers.Authorization = window.sessionStorage.getItem("token");

  console.log(config);
  return config;
}, err => {
  console.log(err);
});

// 响应拦截器
instance.interceptors.response.use(res => {
  // 成功响应直接返回数据
  return res.data;
}, err => {
  // 发生错误进行对应处理
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        console.log("请求错误");
        break;
      case 401:
        console.log("未授权访问");
        break;
      default:
        console.log("其他错误信息");
    }
  }
  return err;
});

export default instance;