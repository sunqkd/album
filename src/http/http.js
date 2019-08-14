import axios from 'axios';
import { Message } from 'element-ui';
import {Decrypt,Encrypt} from './CryptoJS';

axios.defaults.timeout = 100000; // 请求时间超时拦截
axios.defaults.baseURL = ''; // 路径

// 1、请求之前拦截
axios.interceptors.request.use(config => {
    return config;
}, err => {
    return Promise.resolve(err);
})

// -1、 相应之后拦截
axios.interceptors.response.use((data) => {
    let msg = data.data.msg ||　" 成功 ";
    let status = data.data.status;
    if (data.status === 200) {
        if(status == 1){
            // Message.success({ message: msg , showClose: true });
        }else{
            // Message.error({ message: msg , showClose: true });
        }
        // if(process.env.NODE_ENV=='production'){
        //     data.data.data=Decrypt(data.data.data)
        // }
        if(!(/(localhost|test1)/gi.test(window.location.href))){
            data.data.data&&(data.data.data=Decrypt(data.data.data))
        }
    }else{
        Message.error({ message: msg , showClose: true });
    }


    return Promise.resolve(data);

}, (err) => {
    if(err.message.includes('timeout')){
        Message.error({ message: '请求超时! 请刷新', showClose: true });
    }
    return Promise.reject(err);
})


// 暂时不用header信息

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}