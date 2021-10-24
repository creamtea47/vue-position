import request from './request';

// 上锁
export function vehiclSock() {
    return request.get('/vehicl/1');
}
// 解锁
export function vehiclUnSock() {
    return request.get('/vehicl/2');
}
// 报警
export function vehiclpolice() {
    return request.get('/vehicl/3');
}
// 取消报警
export function vehiclUnPolice() {
    return request.get('/vehicl/4');
}
// 获取实时定位
export function location() {
    return request.get('/vehicl/location');
}
// 获取设备状态
export function stateInfo() {
    return request.get('/vehicl/stateInfo');
}
// 用户登录
export function login(username,password) {
    return request.post('/user/login',{
        password,
        username
    })
}
// 退出登录
export function logout() {
    return request.post('/user/logout')
}
// 用户注册
export function register(username,password,checkPassword) {
    return request.post('/user/register',{
        checkPassword,
        password,
        username,   
    })
}
// 绑定设备
export function bindDevice(deciveId) {
    return request.post(`/user/bindDecive?deviceId=${deciveId}`);
}
// 获取用户绑定设备
export function getDevices() {
    return request.get('/user/getDevices');
}