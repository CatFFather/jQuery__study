import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LocalStorageService from '../LocalStorageService';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,

  // 기본 헤더
  // 특정 mime 요청시는 해당 요청에서 order
  headers: { 'Content-type': 'application/json' },

  // Request Tmieout : milliseconds
  // 요청시간이 타임아웃보다 길어지면 요청 중지
  timeout: 5000,
});

const refreshInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { 'Content-type': 'application/json' },
  timeout: 5000,
});

const debug = false;

/**
 * custom hook
 * @returns
 */
export function useExpireToken() {
  debug && console.log('useExpireToken');
  const [tokenExpired, setTokenExpired] = useState(false);

  useEffect(() => {
    debug && console.log('useExpireToken useEffect');

    // Response intercepter
    // 토큰 만료 갱신
    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.error(error.response);

        let refreshToken = LocalStorageService.getRefreshToken();
        const originalRequest = error.config;
        debug && console.log(originalRequest);
        if (
          error.response.status === 401 &&
          error.response.data.meta.systemCode === 'token_not_valid' &&
          !originalRequest._retry &&
          refreshToken
        ) {
          originalRequest._retry = true;
          return refreshInstance
            .post('member/token/refresh', {
              refresh: refreshToken,
            })
            .then((res) => {
              debug && console.log(res);
              LocalStorageService.setToken({
                access: res.data.data.access,
                refresh: res.data.data.refresh,
              });

              // Change Authorization header
              originalRequest.headers['Authorization'] = 'JWT ' + res.data.data.access;

              // return originalRequest object with Axios.
              return instance(originalRequest);
            })
            .catch((e) => {
              // Refresh token fail
              console.log('refresh err!!!!!!!!!!!!!!!!!!');
              setTokenExpired(true);
              return Promise.reject(error);
            });
        }
        return Promise.reject(error);
      }
    );
  }, []);

  function setExpire(expire) {
    setTokenExpired(expire);
  }

  return { tokenExpired, setExpire };
}

// Reuqest interceptor
// 인증 토큰 추가
// 로컬 스토리지에 있을 경우만
instance.interceptors.request.use(
  function (config) {
    let tokenString = LocalStorageService.getAccessToken();
    if (tokenString) {
      config.headers['Authorization'] = 'JWT ' + tokenString;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Reuqest interceptor
// 인증 토큰 추가
// 로컬 스토리지에 있을 경우만
refreshInstance.interceptors.request.use(
  function (config) {
    let tokenString = LocalStorageService.getAccessToken();
    if (tokenString) {
      config.headers['Authorization'] = 'JWT ' + tokenString;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { instance as axiosInstance };
